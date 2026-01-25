# Lesson 1: Introduction to Next.js (Long-form Enhanced)

> This lesson is intentionally long-form so it can double as a reference chapter later. Some sections go beyond “hello world” so you have a place to come back to when you hit real-world performance, caching, or server/client boundary issues.

## Table of Contents

- What Next.js is (and what it adds to React)
- Rendering modes: CSR vs SSR vs SSG (and ISR)
- App Router mental model (Server Components by default)
- Your first page + a “slightly more real” page
- Best practices, pitfalls, troubleshooting

## Learning Objectives

By the end of this lesson, you will be able to:
- Explain what Next.js is and why it exists
- Describe the difference between SSR, SSG, and client-side rendering
- Understand the App Router mental model (server components by default)
- Know when to use server vs client components
- Run a Next.js dev server and locate the entry route (`app/page.tsx`)

## Why Next.js Matters

React is a UI library. Next.js is a framework that adds the “application” parts:
- routing
- server rendering and data fetching patterns
- bundling and optimization defaults
- deployment-friendly output

In real products, those pieces are what make your app fast, SEO-friendly, and maintainable.

```mermaid
flowchart TD
  browser[Browser] --> next[NextJsApp]
  next --> server[ServerRendering]
  next --> client[ClientRendering]
  next --> router[FileBasedRouting]
```

## What is Next.js?

Next.js is a React framework that provides:
- **Server-Side Rendering (SSR)**: render pages on the server per request
- **Static Site Generation (SSG)**: pre-render pages at build time
- **App Router**: modern routing and layout system (Next.js 13+)
- **Route Handlers / API Routes**: build backend endpoints in the same project (optional)
- **Optimization**: automatic code splitting, image/font optimization, caching primitives

## Rendering Modes (High-Level)

### Client-side rendering (CSR)

- HTML is mostly a shell
- React runs in the browser to render content
- good for highly interactive apps, but SEO/perf can suffer if not handled carefully

### Server-side rendering (SSR)

- server renders HTML for the request
- faster first paint + better SEO
- requires thinking about server vs browser-only APIs

### Static generation (SSG)

- HTML is generated at build time
- great for docs/marketing/content sites
- can still be dynamic with revalidation/caching strategies

### Incremental static regeneration (ISR) (concept)

ISR is the “middle path” between fully static and fully dynamic:
- the page can be generated once (like SSG)
- then revalidated over time (so content can update)

In the App Router, you usually express this intent with **caching/revalidation** patterns (you’ll revisit this in the data fetching level).

## App Router vs Pages Router

Next.js 13+ introduces the **App Router** (recommended):
- file-based routing in the `app/` directory
- layouts and nested routes are first-class
- **server components by default** (less JS shipped to the browser)

You may still see the older **Pages Router** (`pages/`) in legacy projects.

## Your First Next.js Page

In App Router, `app/page.tsx` is the home route (`/`).

```typescript
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js</h1>
      <p>This is the home page.</p>
    </main>
  );
}
```

## A “Slightly More Real” Example: Server-first page with client widget

This is the most common pattern in modern Next.js:
- the **page** is server-rendered (fast first paint, less JS)
- a small **client component** handles interactivity

```typescript
// app/page.tsx (server component by default)
import Counter from "./Counter";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>This content renders on the server.</p>
      <Counter />
    </main>
  );
}
```

```typescript
// app/Counter.tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}
```

## Running Your App

```bash
cd project
pnpm dev
```

Then open `http://localhost:3000`.

## Key Concepts (You’ll Use Constantly)

- **Routes**: folders under `app/` become routes
- **Pages**: `page.tsx` is a route entry
- **Layouts**: `layout.tsx` wraps routes with shared UI
- **Server Components**: default; run on server, ship less JS
- **Client Components**: opt-in with `"use client"` for interactivity

## Real-World Scenario: Why This Matters for a Full-Stack App

In a typical product:
- marketing pages are mostly static (SSG)
- authenticated pages often render on the server (SSR) and fetch user data securely
- interactive widgets (forms, modals) run on the client (client components)

## Best Practices

### 1) Default to server components

Only use client components where you need state, effects, event handlers, or browser APIs.

### 2) Keep boundaries explicit

Make it obvious which components are server-only vs client-only to avoid accidental runtime errors.

### 3) Optimize early with the right defaults

Next.js already optimizes a lot—use the framework primitives before reaching for custom solutions.

### 4) Treat rendering mode as a product decision

Pick the simplest mode that meets your requirements:
- **SSG/ISR** for mostly-static content (marketing, docs)
- **SSR / server fetching** for authenticated or frequently changing pages
- **Client fetching** when interactivity requires it (filters, live updates)

## Common Pitfalls and Solutions

### Pitfall 1: Using browser-only APIs in server components

**Problem:** Accessing `window`, `document`, `localStorage`, etc. in a server component.

**Solution:** Move that logic into a client component (`"use client"`) or into an effect.

### Pitfall 2: Making everything a client component

**Problem:** Adding `"use client"` everywhere ships more JS and can reduce performance.

**Solution:** Keep client components small and leaf-level when possible.

### Pitfall 3: Confusing “server-rendered” with “server-only”

**Problem:** You assume SSR means “no client code runs”, then add interactivity and it breaks.

**Solution:** Think in layers:
- server renders initial HTML
- the client hydrates interactive parts

Next.js lets you control how much of your UI needs client-side JavaScript.

## Troubleshooting

### Issue: Dev server starts but you see a blank page or error overlay

**Symptoms:**
- red error overlay in browser
- terminal shows compile errors

**Solutions:**
1. Check the error overlay message and file path.
2. Confirm the route file exists: `app/page.tsx`.
3. Restart the dev server if you changed config files.

### Issue: “window is not defined” / “localStorage is not defined”

**Symptoms:**
- runtime errors mentioning `window`, `document`, or `localStorage`

**Solutions:**
1. Move that code into a client component (`"use client"`).
2. If it must run after render, wrap it in `useEffect`.

### Issue: “Hooks can only be used in Client Components”

**Symptoms:**
- errors about `useState`, `useEffect`, or event handlers not being allowed

**Solutions:**
1. Add `"use client"` to the component that uses hooks.
2. Prefer isolating hook usage into small leaf components to avoid shipping extra JS.

## Next Steps

Now that you understand what Next.js is and how the App Router works at a high level:

1. ✅ **Practice**: Edit `app/page.tsx` and confirm hot reload works
2. ✅ **Experiment**: Add a second route folder (`app/about/page.tsx`)
3. 📖 **Next Lesson**: Learn about [Pages and Routing](./lesson-02-pages-and-routing.md)
4. 💻 **Complete Exercises**: Work through [Exercises 01](./exercises-01.md)

## Additional Resources

- [Next.js Docs: App Router](https://nextjs.org/docs/app)
- [React Docs: Server Components](https://react.dev/reference/react/use-server)
- [Next.js Rendering Fundamentals](https://nextjs.org/docs/app/building-your-application/rendering)

---

**Key Takeaways:**
- Next.js adds routing, rendering strategies, and production-friendly defaults to React.
- App Router uses `app/` and server components by default.
- Use client components only when you need interactivity or browser APIs.
