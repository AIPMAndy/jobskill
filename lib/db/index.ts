import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const DB_PATH = process.env.DATABASE_PATH || join(process.cwd(), 'data', 'jobskill.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);

    // Enable WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    db.pragma('synchronous = NORMAL');
    db.pragma('cache_size = -64000'); // 64MB
    db.pragma('foreign_keys = ON');

    // Initialize schema if needed
    initializeSchema(db);
  }

  return db;
}

function initializeSchema(database: Database.Database) {
  const schemaPath = join(process.cwd(), 'lib', 'db', 'schema.sql');
  const schema = readFileSync(schemaPath, 'utf-8');

  // Execute schema (split by semicolon and filter empty statements)
  const statements = schema
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  for (const statement of statements) {
    database.exec(statement);
  }
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

// Types for database models
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  location?: string;
  timezone?: string;
  target_roles?: string; // JSON array
  salary_min?: number;
  salary_max?: number;
  created_at: string;
  updated_at: string;
}

export interface Resume {
  id: number;
  name: string;
  content: string;
  is_base: number; // SQLite boolean (0 or 1)
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  company: string;
  role: string;
  url?: string;
  jd_text?: string;
  score?: number;
  status: 'Evaluated' | 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Discarded' | 'SKIP';
  report_path?: string;
  pdf_path?: string;
  resume_id?: number;
  notes?: string;
  applied_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ScanHistory {
  id: number;
  company: string;
  job_id: string;
  url: string;
  title?: string;
  scanned_at: string;
}

export interface StarStory {
  id: number;
  title: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  reflection?: string;
  tags?: string; // JSON array
  created_at: string;
  updated_at: string;
}

export interface InterviewPrep {
  id: number;
  application_id: number;
  company_research?: string;
  questions?: string; // JSON array
  created_at: string;
  updated_at: string;
}
