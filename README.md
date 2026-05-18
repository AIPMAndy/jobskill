# JobSkill

AI-powered job search management system built with Next.js and Claude AI.

## Features

- 📝 **Resume Management** - Create and manage multiple resume versions with Markdown support
- 🤖 **AI Job Evaluation** - Evaluate job postings against your resume using Claude AI
- 📊 **Application Tracker** - Kanban board to track your application pipeline
- 📈 **Analytics Dashboard** - Real-time stats and insights on your job search
- 🎯 **Smart Matching** - AI-powered job-resume matching with detailed feedback

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: SQLite with better-sqlite3
- **AI**: Anthropic Claude API (Sonnet 4)
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ or Bun
- Anthropic API key ([Get one here](https://console.anthropic.com/))

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd jobskill
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_api_key_here
DATABASE_PATH=./data/jobskill.db
```

### 4. Run the development server

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Create a Resume

1. Navigate to **Resumes** in the sidebar
2. Click **New Resume**
3. Enter your resume content in Markdown format
4. Set as default if you want to use it for evaluations

### 2. Add a Job

1. Navigate to **Jobs** in the sidebar
2. Click **Add Job**
3. Fill in job details (title, company, description, etc.)
4. Click **Save**

### 3. Evaluate a Job

1. On the Jobs page, click **Evaluate** on any job
2. The AI will analyze the job against your default resume
3. View the match score (0-100) and detailed feedback
4. Review strengths, concerns, and recommendations

### 4. Track Applications

1. Navigate to **Applications** in the sidebar
2. View your application pipeline in Kanban format
3. Drag cards between columns or use status buttons
4. Click on a card to add notes

## Project Structure

```
jobskill/
├── app/
│   ├── api/              # API routes
│   │   ├── jobs/         # Job endpoints
│   │   ├── resumes/      # Resume endpoints
│   │   └── applications/ # Application endpoints
│   ├── dashboard/        # Dashboard pages
│   │   ├── jobs/         # Jobs management
│   │   ├── resumes/      # Resume management
│   │   └── applications/ # Application tracker
│   └── layout.tsx        # Root layout
├── lib/
│   ├── db/               # Database operations
│   │   ├── index.ts      # Database client
│   │   ├── schema.sql    # Database schema
│   │   ├── jobs.ts       # Job operations
│   │   ├── resumes.ts    # Resume operations
│   │   └── applications.ts # Application operations
│   └── ai/
│       └── evaluate.ts   # AI evaluation logic
├── components/
│   └── ui/               # shadcn/ui components
├── data/                 # SQLite database (auto-created)
└── public/               # Static assets
```

## Database Schema

The application uses SQLite with the following main tables:

- **resumes** - Resume versions with Markdown content
- **jobs** - Tracked job opportunities
- **applications** - Application pipeline tracking
- **interviews** - Interview scheduling and notes

## API Endpoints

### Resumes
- `GET /api/resumes` - List all resumes
- `POST /api/resumes` - Create a resume
- `GET /api/resumes/[id]` - Get resume by ID
- `PUT /api/resumes/[id]` - Update resume
- `DELETE /api/resumes/[id]` - Delete resume
- `PATCH /api/resumes/[id]` - Set default resume

### Jobs
- `GET /api/jobs` - List all jobs
- `POST /api/jobs` - Create a job
- `GET /api/jobs/[id]` - Get job by ID
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job
- `POST /api/jobs/[id]/evaluate` - Evaluate job with AI (streaming)

### Applications
- `GET /api/applications` - List all applications
- `POST /api/applications` - Create an application
- `GET /api/applications/[id]` - Get application by ID
- `PUT /api/applications/[id]` - Update application
- `DELETE /api/applications/[id]` - Delete application

## Development

### Build for production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Docker Support (Coming Soon)

Docker and docker-compose configurations will be added for easy deployment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Anthropic Claude](https://www.anthropic.com/)
- Inspired by [career-ops](https://github.com/santifer/career-ops)
