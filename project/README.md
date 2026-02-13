## Frontend course project

This folder is reserved for the **complete reference project** for `fs-course-frontend`.

- Use it as a target structure for a production-quality Next.js app.
- You can also keep your own final app here as you complete lessons and exercises.


Start with the lessons in `level-01-nextjs-basics/` and build forward.

## Project Tracks

Two supported project tracks so students can learn both separation of concerns and the convenience of colocated APIs.

Track A — External API (recommended for production patterns)
- Frontend: Next.js (`fs-course-frontend`)
- Backend: Express/Prisma (`fs-course-backend`)
- How to run locally:
	- Start backend: `cd ../../fs-course-backend && npm run dev`
	- Start frontend: `cd ../fs-course-frontend && npm run dev`
	- Set `NEXT_PUBLIC_API_URL` in frontend `.env.local` to the backend base URL (e.g. `http://localhost:3001`)
- Notes:
	- Enable CORS in the backend (`cors` middleware) or use a proxy during development.
	- Use token-based auth or configure cookies & same-site/domain for secure auth across services.
	- Use Prisma Data Proxy or a long‑lived backend for reliable DB connections in serverless deployments.

Track B — Monorepo / Next.js API routes (good for demos and simple deploys)
- Frontend + API: Next.js (`fs-course-frontend`) with API routes (`/pages/api/*` or `app/api/*/route.js`)
- How to run locally:
	- Implement required endpoints under `app/api` or `pages/api`
	- Start app: `cd ../../fs-course-frontend && npm run dev`
- Notes:
	- Simpler developer experience and same-domain cookies (no CORS).
	- Beware DB connection limits in serverless—prefer containers or Prisma Data Proxy for production.

Recommendation: Teach both. Use Track A for backend lessons (DB, auth, scaling) and Track B as an optional simplified path for quick demos and deployment exercises.

