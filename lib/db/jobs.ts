import { getDb } from './index';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string | null;
  url: string | null;
  description: string | null;
  salary_range: string | null;
  job_type: string | null;
  status: string;
  evaluation_score: number | null;
  evaluation_summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateJobInput {
  title: string;
  company: string;
  location?: string;
  url?: string;
  description?: string;
  salary_range?: string;
  job_type?: string;
  status?: string;
}

export interface UpdateJobInput {
  title?: string;
  company?: string;
  location?: string;
  url?: string;
  description?: string;
  salary_range?: string;
  job_type?: string;
  status?: string;
  evaluation_score?: number;
  evaluation_summary?: string;
}

export function getAllJobs(filters?: {
  status?: string;
  minScore?: number;
}): Job[] {
  const db = getDb();

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params: any[] = [];

  if (filters?.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  if (filters?.minScore !== undefined) {
    query += ' AND evaluation_score >= ?';
    params.push(filters.minScore);
  }

  query += ' ORDER BY created_at DESC';

  const stmt = db.prepare(query);
  return stmt.all(...params) as Job[];
}

export function getJobById(id: number): Job | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM jobs WHERE id = ?');
  return stmt.get(id) as Job | null;
}

export function createJob(input: CreateJobInput): Job {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO jobs (title, company, location, url, description, salary_range, job_type, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.title,
    input.company,
    input.location || null,
    input.url || null,
    input.description || null,
    input.salary_range || null,
    input.job_type || null,
    input.status || 'new'
  );

  return getJobById(result.lastInsertRowid as number)!;
}

export function updateJob(id: number, input: UpdateJobInput): Job | null {
  const db = getDb();

  const job = getJobById(id);
  if (!job) return null;

  const updates: string[] = [];
  const values: any[] = [];

  if (input.title !== undefined) {
    updates.push('title = ?');
    values.push(input.title);
  }
  if (input.company !== undefined) {
    updates.push('company = ?');
    values.push(input.company);
  }
  if (input.location !== undefined) {
    updates.push('location = ?');
    values.push(input.location);
  }
  if (input.url !== undefined) {
    updates.push('url = ?');
    values.push(input.url);
  }
  if (input.description !== undefined) {
    updates.push('description = ?');
    values.push(input.description);
  }
  if (input.salary_range !== undefined) {
    updates.push('salary_range = ?');
    values.push(input.salary_range);
  }
  if (input.job_type !== undefined) {
    updates.push('job_type = ?');
    values.push(input.job_type);
  }
  if (input.status !== undefined) {
    updates.push('status = ?');
    values.push(input.status);
  }
  if (input.evaluation_score !== undefined) {
    updates.push('evaluation_score = ?');
    values.push(input.evaluation_score);
  }
  if (input.evaluation_summary !== undefined) {
    updates.push('evaluation_summary = ?');
    values.push(input.evaluation_summary);
  }

  if (updates.length === 0) return job;

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const stmt = db.prepare(`
    UPDATE jobs
    SET ${updates.join(', ')}
    WHERE id = ?
  `);

  stmt.run(...values);
  return getJobById(id);
}

export function deleteJob(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM jobs WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function getJobStats() {
  const db = getDb();

  const total = db.prepare('SELECT COUNT(*) as count FROM jobs').get() as { count: number };
  const evaluated = db.prepare('SELECT COUNT(*) as count FROM jobs WHERE evaluation_score IS NOT NULL').get() as { count: number };
  const highScore = db.prepare('SELECT COUNT(*) as count FROM jobs WHERE evaluation_score >= 80').get() as { count: number };
  const avgScore = db.prepare('SELECT AVG(evaluation_score) as avg FROM jobs WHERE evaluation_score IS NOT NULL').get() as { avg: number | null };

  return {
    total: total.count,
    evaluated: evaluated.count,
    highScore: highScore.count,
    avgScore: avgScore.avg ? Math.round(avgScore.avg) : null,
  };
}
