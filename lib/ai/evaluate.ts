import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface EvaluationInput {
  jobTitle: string;
  company: string;
  description: string;
  resumeContent: string;
  location?: string;
  salaryRange?: string;
}

export interface EvaluationResult {
  score: number;
  summary: string;
  strengths: string[];
  concerns: string[];
  recommendations: string[];
}

export async function evaluateJob(input: EvaluationInput): Promise<EvaluationResult> {
  const prompt = `You are an expert career advisor. Evaluate this job opportunity against the candidate's resume.

JOB DETAILS:
Title: ${input.jobTitle}
Company: ${input.company}
${input.location ? `Location: ${input.location}` : ''}
${input.salaryRange ? `Salary: ${input.salaryRange}` : ''}

Description:
${input.description}

CANDIDATE RESUME:
${input.resumeContent}

Please provide:
1. Match Score (0-100): How well does this job match the candidate's profile?
2. Summary: Brief overview of the match quality
3. Strengths: Key reasons this is a good fit (3-5 points)
4. Concerns: Potential issues or gaps (2-4 points)
5. Recommendations: Specific advice for the application (2-3 points)

Format your response as JSON:
{
  "score": <number>,
  "summary": "<string>",
  "strengths": ["<string>", ...],
  "concerns": ["<string>", ...],
  "recommendations": ["<string>", ...]
}`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  // Extract JSON from response (handle markdown code blocks)
  let jsonText = content.text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/, '').replace(/\n?```$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/, '').replace(/\n?```$/, '');
  }

  const result = JSON.parse(jsonText) as EvaluationResult;

  // Validate score is in range
  if (result.score < 0 || result.score > 100) {
    result.score = Math.max(0, Math.min(100, result.score));
  }

  return result;
}

export async function* evaluateJobStream(input: EvaluationInput): AsyncGenerator<string, void, unknown> {
  const prompt = `You are an expert career advisor. Evaluate this job opportunity against the candidate's resume.

JOB DETAILS:
Title: ${input.jobTitle}
Company: ${input.company}
${input.location ? `Location: ${input.location}` : ''}
${input.salaryRange ? `Salary: ${input.salaryRange}` : ''}

Description:
${input.description}

CANDIDATE RESUME:
${input.resumeContent}

Please provide:
1. Match Score (0-100): How well does this job match the candidate's profile?
2. Summary: Brief overview of the match quality
3. Strengths: Key reasons this is a good fit (3-5 points)
4. Concerns: Potential issues or gaps (2-4 points)
5. Recommendations: Specific advice for the application (2-3 points)

Format your response as JSON:
{
  "score": <number>,
  "summary": "<string>",
  "strengths": ["<string>", ...],
  "concerns": ["<string>", ...],
  "recommendations": ["<string>", ...]
}`;

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
      yield chunk.delta.text;
    }
  }
}
