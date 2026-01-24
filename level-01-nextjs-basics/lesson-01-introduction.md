# Lesson 1: Introduction to Next.js

## What is Next.js?

Next.js is a React framework that provides:
- **Server-Side Rendering (SSR)**: Render pages on the server
- **Static Site Generation (SSG)**: Pre-render pages at build time
- **App Router**: Modern routing system (Next.js 13+)
- **API Routes**: Build API endpoints alongside your frontend
- **Optimization**: Automatic code splitting, image optimization, and more

## Why Next.js?

- **Performance**: Fast page loads with SSR and SSG
- **Developer Experience**: Great tooling and developer experience
- **SEO**: Better SEO with server-side rendering
- **Full-Stack**: Build frontend and API in one project
- **TypeScript**: First-class TypeScript support

## App Router vs Pages Router

Next.js 13+ uses the **App Router** (recommended):
- File-based routing in `app/` directory
- Server Components by default
- Better performance and developer experience

## Your First Next.js Page

```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <p>This is the home page.</p>
    </div>
  );
}
```

## Running Your App

```bash
cd project
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your page.

## Key Concepts

- **Pages**: Files in `app/` directory become routes
- **Components**: Reusable React components
- **Server Components**: Default in App Router, run on server
- **Client Components**: Use `"use client"` directive for interactivity
