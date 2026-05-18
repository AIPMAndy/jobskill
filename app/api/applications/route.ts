import { NextRequest, NextResponse } from 'next/server';
import { getAllApplications, createApplication, CreateApplicationInput } from '@/lib/db/applications';
import { z } from 'zod';

const createApplicationSchema = z.object({
  job_id: z.number().int().positive(),
  resume_id: z.number().int().positive().optional(),
  status: z.string().optional(),
  applied_date: z.string().optional(),
  notes: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    let applications;
    if (status) {
      const { getApplicationsByStatus } = await import('@/lib/db/applications');
      applications = getApplicationsByStatus(status);
    } else {
      applications = getAllApplications();
    }

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createApplicationSchema.parse(body);

    const application = createApplication(validated as CreateApplicationInput);
    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}
