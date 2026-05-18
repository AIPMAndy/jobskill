import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs, createJob, CreateJobInput } from '@/lib/db/jobs';
import { z } from 'zod';

const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().optional(),
  url: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  salary_range: z.string().optional(),
  job_type: z.string().optional(),
  status: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || undefined;
    const minScore = searchParams.get('minScore')
      ? parseFloat(searchParams.get('minScore')!)
      : undefined;

    const jobs = getAllJobs({ status, minScore });
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createJobSchema.parse(body);

    const job = createJob(validated as CreateJobInput);
    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}
