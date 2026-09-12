# Open Specter

Open Specter is an open-source AI workspace for legal teams. Organize matters, review documents, run AI conversations, build tabular reviews, and automate repetitive legal workflows.

<img width="1071" height="600" alt="Frame 4" src="https://github.com/user-attachments/assets/a3e9d6ec-e43d-4473-8f6d-243c22a1fce0" />

Maintained by **Quantera.ai**.

---

## Features

- **Projects** — Organize documents by matter, client, or workflow.
- **Document Management** — File uploads, versioning, and document parsing for AI review.
- **Assistant Chat** — Question answering, summarization, drafting, and citations over selected context.
- **Tabular Reviews** — Extract structured data across document batches into review tables.
- **Workflows** — Reusable prompt chains and tabular review templates.
- **Recent Activity** — Timeline of recent chats, reviews, and workflow runs.
- **Keyboard Shortcuts** — Command-style navigation and quick actions.
- **Voice Input** — Browser-native speech-to-text for assistant prompts.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| UI | Radix Primitives, Lucide Icons |
| Backend | Express + TypeScript |
| Database & Auth | Supabase (PostgreSQL + Row Level Security) |
| Storage | Cloudflare R2 / S3-compatible (with local disk fallback for dev) |
| AI Providers | Gemini, Anthropic, OpenRouter-compatible models |
| Legal Research | [LegalDataHunter](https://legaldatahunter.com) (case law & statutes across 178 jurisdictions), [Vaquill](https://www.vaquill.ai/legal-api) (US primary law & Indian case law) |
| Document Tooling | LibreOffice (DOC/DOCX conversion) |

---

## Repository Structure

```txt
.
├── backend/
│   ├── migrations/
│   │   ├── 000_one_shot_schema.sql       # Initial database schema and RLS policies
│   │   └── 001_rls_content_tables.sql    # Incremental RLS updates
│   └── src/
│       ├── routes/                       # API routes
│       ├── lib/                          # Supabase, storage, AI, and document helpers
│       └── index.ts                      # Server entry point
├── frontend/
│   ├── public/                           # Static assets
│   └── src/
│       ├── app/                          # Next.js App Router pages
│       ├── components/                   # Shared UI and product components
│       ├── contexts/                     # State and auth providers
│       └── lib/                          # API and browser utilities
└── README.md
```

---

## Prerequisites

- Node.js 20+
- Yarn 1.x
- Supabase account & project
- *(Optional)* Cloudflare R2 or S3-compatible storage
- *(Optional)* LibreOffice on the host system for DOCX conversion

---

## Configuration

Copy the example environment files:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

### Backend (`backend/.env`)

```env
PORT=3001
FRONTEND_URL=http://localhost:3000

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SECRET_KEY=your-supabase-service-role-key

# Storage (optional for local development; defaults to local disk)
R2_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=open-specter

# AI Providers (enable any combination)
GEMINI_API_KEY=your-gemini-key
ANTHROPIC_API_KEY=your-anthropic-key
OPENROUTER_API_KEY=your-openrouter-key
RESEND_API_KEY=your-resend-key

# Legal Research Providers (optional; requires provider API keys)
LEGAL_DATA_HUNTER_API_KEY=your-legaldatahunter-key
VAQUILL_API_KEY=vq_key_your_vaquill_key
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-publishable-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## Database Setup

Apply the schema and Row Level Security policies to your Supabase database:

1. In your Supabase project, open the **SQL Editor**.
2. Run [`backend/migrations/000_one_shot_schema.sql`](./backend/migrations/000_one_shot_schema.sql).
3. Verify that the core tables (`projects`, `documents`, `chats`, `tabular_reviews`, `workflows`) appear in the Table Editor.

> If updating an existing deployment where only RLS policies need refreshing, run [`backend/migrations/001_rls_content_tables.sql`](./backend/migrations/001_rls_content_tables.sql) instead.

---

## Getting Started

### 1. Install dependencies

```bash
yarn --cwd backend install
yarn --cwd frontend install
```

*(If your environment flags Node version mismatches, append `--ignore-engines`)*.

### 2. Run locally

Start the backend:
```bash
yarn --cwd backend dev
```

Start the frontend:
```bash
yarn --cwd frontend dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## Verification

Build both packages to ensure TypeScript compilation and dependencies pass:

```bash
yarn --cwd backend build
yarn --cwd frontend build
```

Health check:
```bash
curl http://localhost:3001/health
# {"ok":true}
```

---

## Keyboard Shortcuts

Press `Cmd/Ctrl + /` to open the shortcuts modal, or use:

| Shortcut | Action |
| --- | --- |
| `Cmd/Ctrl + 1` | Assistant |
| `Cmd/Ctrl + 2` | Projects |
| `Cmd/Ctrl + 3` | Tabular Reviews |
| `Cmd/Ctrl + 4` | Workflows |
| `Cmd/Ctrl + B` | Toggle Sidebar |
| `Cmd/Ctrl + J` | Focus Assistant Prompt |
| `Cmd/Ctrl + ,` | Settings |

---

## Troubleshooting

- **Missing table or PostgREST cache error**: Ensure `backend/migrations/000_one_shot_schema.sql` was executed successfully in the `public` schema in Supabase.
- **Upload failures in production**: Verify your R2/S3 bucket name and access keys in `backend/.env`. If unconfigured, files default to local storage at `/app/data/open-specter-storage`.

---

## Security

Please report vulnerabilities privately. See [`SECURITY.md`](./SECURITY.md) for disclosure guidelines and production hardening recommendations.

---

## License

Distributed under the GNU Affero General Public License v3.0 (AGPL-3.0). See [`LICENSE`](./LICENSE) for terms.

---

## Credits & inspiration

Open Specter is a fork of **[Mike](https://mikeoss.com/)** ([willchen96/mike](https://github.com/willchen96/mike)), released under AGPL-3.0.

Open Specter builds upon that foundation with:

- A neutral grayscale enterprise-grade UI overhaul
- Supabase anonymous sign-ins / Guest Mode + 7-day cleanup of orphaned accounts
- 10+ additional legal workflow templates
- **LegalDataHunter** integration for jurisdiction-scoped case-law and legislation retrieval with inline citations across 178 jurisdictions
