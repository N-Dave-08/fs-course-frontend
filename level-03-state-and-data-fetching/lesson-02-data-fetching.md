# Lesson 2: Data Fetching

## Learning Objectives

By the end of this lesson, you will be able to:
- Fetch data in Server Components (preferred default in App Router)
- Fetch data in Client Components (when interactivity requires it)
- Use loading UI (`app/loading.tsx`) and understand streaming basics
- Handle common fetch errors and avoid silent failures
- Recognize common pitfalls (waterfalls, double fetching, missing caching intent)

## Why Data Fetching Matters

Most frontend screens exist to display data:
- posts, products, users
- dashboards and analytics

In Next.js App Router, you can fetch data on the server by default, which often improves:
- performance (less client JS, faster first paint)
- security (keep secrets on the server)
- caching options (framework-aware caching)

```mermaid
flowchart LR
  request[Request] --> server[ServerComponent]
  server -->|fetch| data[DataSource]
  server --> html[HTMLStream]
  html --> browser[Browser]
```

## Server Components (Recommended Default)

Fetch data in Server Components (no `"use client"`).

```typescript
// app/posts/page.tsx
type Post = { id: string; title: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://api.example.com/posts");
  if (!res.ok) throw new Error(`Failed to load posts: ${res.status}`);
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Why server fetching is often better

- no “loading spinner then content” for the initial HTML (in many cases)
- you avoid exposing API keys to the browser
- you can keep request logic close to the route that needs it

## Client-Side Fetching (When Needed)

Use client-side fetching when:
- data depends on user interactions (filters/search)
- you need browser-only APIs
- you want periodic refresh/polling

```typescript
"use client";

import { useEffect, useState } from "react";

type Post = { id: string; title: string };

export default function ClientPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/posts")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Post[]) => {
        if (!cancelled) setPosts(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <div>Failed to load: {error}</div>;
  return <div>{posts.map((p) => <div key={p.id}>{p.title}</div>)}</div>;
}
```

## Loading UI (`app/loading.tsx`)

App Router supports `loading.tsx` for route-level loading UI while server components stream.

```typescript
// app/posts/loading.tsx
export default function Loading() {
  return <div>Loading posts...</div>;
}
```

### Mental model

- Next.js can start rendering UI and stream pieces as data resolves
- `loading.tsx` displays while the segment is waiting

## Avoiding Waterfalls

A “waterfall” happens when you await fetches sequentially that could be parallel.

Prefer:

```typescript
const [posts, user] = await Promise.all([getPosts(), getUser()]);
```

instead of awaiting one and then the other if they are independent.

## Real-World Scenario: Where to Fetch Data

Common pattern:
- Server Component fetches initial data (fast, secure)
- Client Component handles interactive updates (filters, sorting, pagination)

```mermaid
flowchart TD
  page[PageServerComponent] --> initial[InitialFetchOnServer]
  page --> widget[ClientWidget]
  widget --> clientFetch[FetchOnInteraction]
```

## Best Practices

### 1) Default to server fetching

Use client fetching when you truly need browser-side updates.

### 2) Always handle non-OK responses

Check `res.ok` so you don’t silently render “undefined” data.

### 3) Keep data boundaries clear

Use typed DTOs (`type Post = ...`) so you don’t spread `any` through your UI.

## Common Pitfalls and Solutions

### Pitfall 1: Double fetching (server + client)

**Problem:** You fetch in a server component and then fetch the same data again in a client component on mount.

**Solution:** Pass initial data into the client component as props and only refetch on interaction.

### Pitfall 2: Fetching secrets in the client

**Problem:** API keys get bundled into browser JavaScript.

**Solution:** Fetch on the server or via route handlers, never directly in the client.

### Pitfall 3: Unclear caching behavior

**Problem:** Data updates don’t appear when expected, or you refetch too often.

**Solution:** Make caching intent explicit (advanced topic) and test behavior with real endpoints.

## Troubleshooting

### Issue: "Failed to fetch" in the browser

**Symptoms:**
- client component fetch fails immediately

**Solutions:**
1. Confirm the API route exists and is reachable (`/api/posts`).
2. Check CORS if calling an external domain directly from the browser.
3. Inspect the Network tab for status code and error details.

### Issue: Server fetch works locally but fails in production

**Symptoms:**
- production errors or timeouts

**Solutions:**
1. Confirm environment variables/secrets are configured for production.
2. Confirm the external API allows calls from your deployed environment.

## Next Steps

Now that you understand the core data fetching approaches:

1. ✅ **Practice**: Fetch posts in a server page and render them
2. ✅ **Experiment**: Add a client-side filter that refetches based on user input
3. 📖 **Next Lesson**: Learn about [Server Components](./lesson-03-server-components.md)
4. 💻 **Complete Exercises**: Work through [Exercises 03](./exercises-03.md)

## Additional Resources

- [Next.js Docs: Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)
- [Next.js Docs: Loading UI](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)

---

**Key Takeaways:**
- Server component fetching is the default and often best for initial data.
- Client fetching is for interactivity and browser-driven updates.
- Always handle non-OK responses and show clear loading/error states.
- Avoid waterfalls by fetching independent data in parallel.
