-- JobSkill Database Schema
-- SQLite database for job search management

-- User profile (singleton, one row)
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  location TEXT,
  timezone TEXT,
  target_roles TEXT, -- JSON array
  salary_min INTEGER,
  salary_max INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Resume versions
CREATE TABLE IF NOT EXISTS resumes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  content TEXT NOT NULL, -- Markdown format
  is_base BOOLEAN DEFAULT 0, -- Base resume flag
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Job applications
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  url TEXT,
  jd_text TEXT, -- Job description
  score REAL CHECK (score >= 0 AND score <= 5),
  status TEXT NOT NULL CHECK (status IN (
    'Evaluated', 'Applied', 'Interview', 'Offer', 'Rejected', 'Discarded', 'SKIP'
  )),
  report_path TEXT, -- Relative path: reports/xxx.md
  pdf_path TEXT, -- Relative path: output/xxx.pdf
  resume_id INTEGER,
  notes TEXT,
  applied_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE SET NULL
);

-- Job scan history (deduplication)
CREATE TABLE IF NOT EXISTS scan_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company TEXT NOT NULL,
  job_id TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT,
  scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(company, job_id)
);

-- STAR interview stories
CREATE TABLE IF NOT EXISTS star_stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  situation TEXT,
  task TEXT,
  action TEXT,
  result TEXT,
  reflection TEXT,
  tags TEXT, -- JSON array: ["leadership", "conflict"]
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Interview preparation notes
CREATE TABLE IF NOT EXISTS interview_prep (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  application_id INTEGER NOT NULL,
  company_research TEXT, -- Markdown
  questions TEXT, -- JSON array of questions
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_score ON applications(score DESC);
CREATE INDEX IF NOT EXISTS idx_applications_created ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scan_history_company_job ON scan_history(company, job_id);

-- Performance pragmas
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA cache_size = -64000; -- 64MB
PRAGMA foreign_keys = ON;
