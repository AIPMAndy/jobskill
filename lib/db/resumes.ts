import { getDb } from './index';

export interface Resume {
  id: number;
  name: string;
  content: string;
  file_path: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateResumeInput {
  name: string;
  content: string;
  file_path?: string;
  is_default?: boolean;
}

export interface UpdateResumeInput {
  name?: string;
  content?: string;
  file_path?: string;
  is_default?: boolean;
}

export function getAllResumes(): Resume[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM resumes ORDER BY created_at DESC');
  return stmt.all() as Resume[];
}

export function getResumeById(id: number): Resume | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM resumes WHERE id = ?');
  return stmt.get(id) as Resume | null;
}

export function getDefaultResume(): Resume | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM resumes WHERE is_default = 1 LIMIT 1');
  return stmt.get() as Resume | null;
}

export function createResume(input: CreateResumeInput): Resume {
  const db = getDb();

  // If setting as default, unset other defaults first
  if (input.is_default) {
    db.prepare('UPDATE resumes SET is_default = 0').run();
  }

  const stmt = db.prepare(`
    INSERT INTO resumes (name, content, file_path, is_default)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    input.name,
    input.content,
    input.file_path || null,
    input.is_default ? 1 : 0
  );

  return getResumeById(result.lastInsertRowid as number)!;
}

export function updateResume(id: number, input: UpdateResumeInput): Resume | null {
  const db = getDb();

  const resume = getResumeById(id);
  if (!resume) return null;

  // If setting as default, unset other defaults first
  if (input.is_default) {
    db.prepare('UPDATE resumes SET is_default = 0').run();
  }

  const updates: string[] = [];
  const values: any[] = [];

  if (input.name !== undefined) {
    updates.push('name = ?');
    values.push(input.name);
  }
  if (input.content !== undefined) {
    updates.push('content = ?');
    values.push(input.content);
  }
  if (input.file_path !== undefined) {
    updates.push('file_path = ?');
    values.push(input.file_path);
  }
  if (input.is_default !== undefined) {
    updates.push('is_default = ?');
    values.push(input.is_default ? 1 : 0);
  }

  if (updates.length === 0) return resume;

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const stmt = db.prepare(`
    UPDATE resumes
    SET ${updates.join(', ')}
    WHERE id = ?
  `);

  stmt.run(...values);
  return getResumeById(id);
}

export function deleteResume(id: number): boolean {
  const db = getDb();
  const stmt = db.prepare('DELETE FROM resumes WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
}

export function setDefaultResume(id: number): Resume | null {
  const db = getDb();

  const resume = getResumeById(id);
  if (!resume) return null;

  // Unset all defaults
  db.prepare('UPDATE resumes SET is_default = 0').run();

  // Set this one as default
  db.prepare('UPDATE resumes SET is_default = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(id);

  return getResumeById(id);
}
