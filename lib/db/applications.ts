import { getDb } from './index';

export interface Application {
  id: number;
  job_id: number;
  resume_id: number | null;
  status: string;
  applied_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApplicationWithDetails extends Application {
  job_title: string;
  job_company: string;
  resume_name: string | null;
}

export interface CreateApplicationInput {
  job_id: number;
  resume_id?: number;
  status?: string;
  applied_date?: string;
  notes?: string;
}

export interface UpdateApplicationInput {
  resume_id?: number;
  status?: string;
  applied_date?: string;
  notes?: string;
}

export function getAllApplications(): ApplicationWithDetails[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT
      a.*,
      j.title as job_title,
      j.company as job_company,
      r.name as resume_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    LEFT JOIN resumes r ON a.resume_id = r.id
    ORDER BY a.created_at DESC
  `);
  return stmt.all() as ApplicationWithDetails[];
}

export function getApplicationById(id: number): ApplicationWithDetails | null {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT
      a.*,
      j.title as job_title,
      j.company as job_company,
      r.name as resume_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    LEFT JOIN resumes r ON a.resume_id = r.id
    WHERE a.id = ?
  `);
  return stmt.get(id) as ApplicationWithDetails | null;
}

export function getApplicationsByStatus(status: string): ApplicationWithDetails[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT
      a.*,
      j.title as job_title,
      j.company as job_company,
      r.name as resume_name
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    LEFT JOIN resumes r ON a.resume_id = r.id
    WHERE a.status = ?
    ORDER BY a.created_at DESC
  `);
  return stmt.all(status) as ApplicationWithDetails[];
}

export function createApplication(input: CreateApplicationInput): Application {
  const db = getDb();

  const stmt = db.prepare(`
    INSERT INTO applications (job_id, resume_id, status, applied_date, notes)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.job_id,
    input.resume_id || null,
    input.status || 'applied',
    input.applied_date || null,
    input.notes || null
  );

  const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(result.lastInsertRowid) as Application;
  return app;
}

export function updateApplication(id: number, input: UpdateApplicationInput): Application | null {
  const db = getDb();

  const app = db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as Application | null;
  if (!app) return null;

  const updates: string[] = [];
  const values: any[] = [];

  if (input.resume_id !== undefined) {
    updates.push('resume_id = ?');
    values.push(input.resume_id);
  }
  if (input.status !== undefined) {
    updates.push('status = ?');
    values.push(input.status);
  }
  if (input.applied_date !== undefined) {
    updates.push('applied_date = ?');
    values.push(input.applied_date);
  }
  if (input.notes !== undefined) {
    updates.push('notes = ?');
    values.push(input.notes);
  }

  if (updates.length === 0) return app;

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const stmt = db.prepare(`
    UPDATE applications
    SET ${updates.join(', ')}
    WHERE id = ?
  `);

  stmt.run(...values);
  return db.prepare('SELECT * FROM applications WHERE id = ?').get(id) as Application;
}

export function deleteApplication(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM applications WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function getApplicationStats() {
  const db = getDb();

  const total = db.prepare('SELECT COUNT(*) as count FROM applications').get() as { count: number };
  const byStatus = db.prepare(`
    SELECT status, COUNT(*) as count
    FROM applications
    GROUP BY status
  `).all() as { status: string; count: number }[];

  const stats: Record<string, number> = {
    total: total.count,
  };

  byStatus.forEach((item) => {
    stats[item.status] = item.count;
  });

  return stats;
}
