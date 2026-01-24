# Full Stack Course: Frontend

Modern frontend development with Next.js, React, and TypeScript.

## Overview

This course teaches you how to build modern, scalable frontend applications using Next.js 16.1.4+, React 19+, and TypeScript 5.7+. You'll learn server components, client components, routing, state management, API integration, and more.

## Central Course Docs (Meta Repo)

- **Version Matrix**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/VERSION-MATRIX.md`
- **Learning Flow**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/LEARNING-FLOW.md`
- **Course Index**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/COURSE-INDEX.md`

## Prerequisites

**IMPORTANT**: Complete [fs-course-typescript](../fs-course-typescript/) first. This course requires TypeScript knowledge.

- TypeScript fundamentals (from fs-course-typescript)
- Node.js 22+ LTS
- pnpm package manager
- Basic HTML/CSS knowledge

## Course Structure

This course consists of **6 progressive levels**:

1. **Level 1: Next.js Basics** - Introduction, pages, routing, components
2. **Level 2: Styling and Layout** - Tailwind CSS, layouts, responsive design
3. **Level 3: State and Data Fetching** - React hooks, data fetching, server components
4. **Level 4: API Integration** - API client setup, making requests, error handling
5. **Level 5: Authentication** - Auth concepts, protected routes, session management
6. **Level 6: Advanced Patterns** - Optimization, performance, testing

## Getting Started

1. **Read the Setup Guide**: Start with [LEARNING-GUIDE.md](./LEARNING-GUIDE.md)
2. **Follow Setup Instructions**: Install dependencies and configure your environment
3. **Start Learning**: Begin with Level 1 and progress sequentially
4. **Create Your App**: Follow the guide to scaffold the `project/` folder (this is where you’ll build your Next.js app)

## Learning Flow

1. **Set Up Environment**: Follow LEARNING-GUIDE.md to scaffold Next.js project
2. **Read Lessons**: Go through lessons sequentially
3. **Complete Exercises**: Practice with hands-on exercises
4. **Work in `project/`**: Create files in `project/src/` as the exercises direct
5. **Build Your Own**: Apply knowledge to your own projects

## File Structure

```
fs-course-frontend/
├── README.md (this file)
├── LEARNING-GUIDE.md (setup instructions)
├── .env.example (environment variables)
├── level-01-nextjs-basics/ (lessons and exercises)
├── level-02-styling-and-layout/
├── level-03-state-and-data-fetching/
├── level-04-api-integration/
├── level-05-authentication/
├── level-06-advanced-patterns/
├── project/ (you create this via `create-next-app`; contains your Next.js app)
└── resources/ (cheatsheets and reference materials)
```

## Tech Stack

- **Next.js**: latest stable (installed via `create-next-app@latest`)
- **React**: version bundled by your installed Next.js version
- **TypeScript**: latest stable (managed by your project toolchain)
- **Tailwind CSS**: latest stable (installed by the scaffolder)
- **Package Manager**: pnpm

See the course-wide version matrix:
- `https://github.com/N-Dave-08/fs-course-meta/blob/main/VERSION-MATRIX.md`

## Related Courses

- **fs-course-backend** - Build the API this frontend connects to
- **fs-course-database** - Understand the data layer
- **fs-course-testing** - Test your frontend applications

## Integration

This frontend is designed to work with:
- **Backend API** from `fs-course-backend` (connect via `NEXT_PUBLIC_API_URL`)
- **Database** from `fs-course-database` (indirectly through backend)
- **Caching** from `fs-course-caching` (indirectly through backend)
- **Error tracking** from `fs-course-error-tracking` (integrate Sentry client-side)
- **Infrastructure** from `fs-course-infrastructure` (deploy with Docker)

### Environment Variables

Configure in `.env.local`:

```env
# Backend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3001

# Error tracking (optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Connecting to Backend

1. Ensure `fs-course-backend` is running
2. Set `NEXT_PUBLIC_API_URL` to backend URL
3. Use API client from Level 4 lessons
4. Test integration with backend endpoints

### Full Stack Integration

When all courses are complete:
- Frontend (this repo) → Backend API → Database
- Frontend → Error Tracking (Sentry)
- All services → Infrastructure (Docker, AWS)

## Troubleshooting

See [LEARNING-GUIDE.md](./LEARNING-GUIDE.md) for troubleshooting tips and common issues.
