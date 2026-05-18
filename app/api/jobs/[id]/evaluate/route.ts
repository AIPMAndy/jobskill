import { NextRequest } from 'next/server';
import { getJobById, updateJob } from '@/lib/db/jobs';
import { getDefaultResume } from '@/lib/db/resumes';
import { evaluateJobStream } from '@/lib/ai/evaluate';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: 'Invalid ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const job = getJobById(id);
    if (!job) {
      return new Response(JSON.stringify({ error: 'Job not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get resume (from request body or use default)
    const body = await request.json();
    let resumeContent = body.resumeContent;

    if (!resumeContent) {
      const defaultResume = getDefaultResume();
      if (!defaultResume) {
        return new Response(
          JSON.stringify({ error: 'No resume provided and no default resume found' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      resumeContent = defaultResume.content;
    }

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullResponse = '';

          // Stream the evaluation
          for await (const chunk of evaluateJobStream({
            jobTitle: job.title,
            company: job.company,
            description: job.description || '',
            resumeContent,
            location: job.location || undefined,
            salaryRange: job.salary_range || undefined,
          })) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`));
          }

          // Parse the complete response and save to database
          try {
            let jsonText = fullResponse.trim();
            if (jsonText.startsWith('```json')) {
              jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
            } else if (jsonText.startsWith('```')) {
              jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
            }

            const result = JSON.parse(jsonText);

            // Update job with evaluation results
            updateJob(id, {
              evaluation_score: result.score,
              evaluation_summary: result.summary,
              status: 'evaluated',
            });

            // Send completion event with full result
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ done: true, result })}\n\n`)
            );
          } catch (parseError) {
            console.error('Error parsing evaluation result:', parseError);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ error: 'Failed to parse evaluation result' })}\n\n`
              )
            );
          }

          controller.close();
        } catch (error) {
          console.error('Error during evaluation:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Evaluation failed' })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in evaluate endpoint:', error);
    return new Response(JSON.stringify({ error: 'Failed to evaluate job' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
