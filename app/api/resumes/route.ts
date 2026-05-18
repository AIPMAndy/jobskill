import { NextRequest, NextResponse } from 'next/server';
import { getAllResumes, createResume, CreateResumeInput } from '@/lib/db/resumes';
import { z } from 'zod';

const createResumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Content is required'),
  file_path: z.string().optional(),
  is_default: z.boolean().optional(),
});

export async function GET() {
  try {
    const resumes = getAllResumes();
    return NextResponse.json({ resumes });
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createResumeSchema.parse(body);

    const resume = createResume(validated as CreateResumeInput);
    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating resume:', error);
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    );
  }
}
