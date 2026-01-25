# Lesson 3: Components (Long-form Enhanced)

> Components are where “React fundamentals” meet “Next.js architecture”. This long-form lesson focuses on the server/client boundary because it’s the biggest practical difference between App Router apps and older React SPA patterns.

## Table of Contents

- Server Components vs Client Components (what runs where)
- Safe composition patterns (server renders client widgets)
- Prop typing and component APIs
- Organization patterns (UI vs layout vs feature)
- Pitfalls, troubleshooting, and performance notes

## Learning Objectives

By the end of this lesson, you will be able to:
- Explain the difference between Server Components and Client Components
- Decide where a component should run (server vs client) and why
- Compose server and client components safely (and understand the boundary)
- Type component props cleanly with TypeScript
- Organize components in a maintainable folder structure

## Why Components Matter

Components are how you build UI with React/Next.js:
- reuse UI and logic
- keep pages small and readable
- enforce consistent design patterns

In the App Router, you also use components to control what runs on the server vs what ships to the browser.

```mermaid
flowchart TD
  page[PageComponent] --> server[ServerComponents]
  page --> client[ClientComponents]
  server --> data[ServerDataAccess]
  client --> interactivity[EventsStateEffects]
```

## Server Components (Default)

Server Components run on the server. In App Router, components are server components by default.

```typescript
// app/components/ServerComponent.tsx
export default async function ServerComponent() {
  // This runs on the server
  const data = await fetchDataFromDatabase();

  return <div>{data}</div>;
}
```

**Benefits:**
- No component JavaScript sent to the client (smaller bundles)
- Can access server resources (DB, internal services) securely
- Often faster initial load and better caching options

### Important note

The example uses `async` to emphasize the server environment. Server components can `await` data directly.

## Client Components

Use `"use client"` when you need:
- state (`useState`)
- effects (`useEffect`)
- event handlers (`onClick`, `onChange`)
- browser-only APIs (`window`, `localStorage`)

```typescript
// app/components/ClientComponent.tsx
"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
```

## Component Composition (Server + Client)

It’s common to build server pages that render client widgets:

```typescript
import ServerComponent from "./components/ServerComponent";
import ClientComponent from "./components/ClientComponent";

export default function Page() {
  return (
    <div>
      <ServerComponent />
      <ClientComponent />
    </div>
  );
}
```

### Understanding the boundary

Server components can render client components, but you must be careful what data you pass across:
- pass serializable props (plain objects, strings, numbers)
- don’t pass server-only things (DB connections, functions that run on server, etc.)

## A Practical Pattern: Server page + client “islands”

Real apps often follow this “islands” approach:
- keep most UI server-rendered
- add small client islands for interactivity (filters, modals, forms)

Why this matters:
- smaller JS bundles
- fewer hydration edge cases
- clearer separation between data-loading and UI events

## Props and TypeScript

Type your component props to prevent invalid usage:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### Common pattern: children

```typescript
type CardProps = {
  title: string;
  children: React.ReactNode;
};

export function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

## Component Organization

Organize components in a predictable structure:

```text
src/
  components/
    ui/
      Button.tsx
      Card.tsx
    layout/
      Header.tsx
      Footer.tsx
  app/
    page.tsx
```

## Real-World Scenario: Building a Product Page

A typical pattern is:
- server component loads product data
- client component handles “Add to cart” interactions

This keeps secrets and data fetching on the server, while interactivity stays on the client.

## Best Practices

### 1) Default to server components

Add `"use client"` only where needed.

### 2) Keep client components small

Make the interactive part a small leaf component; let the surrounding layout stay server-rendered.

### 3) Treat props as your component API

Strong prop types make components easy to use correctly and hard to misuse.

### 4) Avoid “prop drilling by accident”

If data has to flow through many components:
- consider colocating the state closer to where it’s used
- or use context for truly global concerns (theme, auth state)

Prefer the simplest tool that keeps components readable.

## Common Pitfalls and Solutions

### Pitfall 1: Using hooks in a server component

**Problem:** You call `useState`/`useEffect` without `"use client"`.

**Solution:** Mark the component as a client component or move the interactive code into a client child.

### Pitfall 2: Passing non-serializable props to a client component

**Problem:** Passing functions/classes/complex instances across the server→client boundary.

**Solution:** Pass primitives/plain objects; keep server-only behavior on the server.

### Pitfall 3: Making a “layout” client component unnecessarily

**Problem:** You add `"use client"` at the top of a big layout and ship lots of JS.

**Solution:** Keep the layout server-side; isolate only the interactive widget as client.

### Pitfall 4: Fetching data in a client component when it could be server-side

**Problem:** You fetch on the client, then show a spinner, even though the page could have server-rendered initial data.

**Solution:** Default to server fetching in the page (or a server component) and only fetch on the client for truly interactive updates.

## Troubleshooting

### Issue: "You're importing a component that needs useState/useEffect..."

**Symptoms:**
- Next.js complains about hooks usage in server components.

**Solutions:**
1. Add `"use client"` to the component using hooks.
2. Move hook usage into a dedicated client component.

### Issue: "Functions cannot be passed to Client Components..."

**Symptoms:**
- You pass a function prop from server to client.

**Solutions:**
1. Replace function props with serializable data props.
2. Move the logic into the client component or use server actions (advanced topic).

### Issue: Hydration mismatch warnings

**Symptoms:**
- console warnings about content not matching between server and client

**Solutions:**
1. Avoid using `Date.now()`, random values, or browser-only state during the initial server render.
2. If something must be client-only, render it inside a client component and initialize it after mount.

## Next Steps

Now that you understand components in the App Router:

1. ✅ **Practice**: Build a server page that renders a small client counter widget
2. ✅ **Experiment**: Refactor a client-heavy page to use more server components
3. 📖 **Next Level**: Move to styling and layout with Tailwind
4. 💻 **Complete Exercises**: Work through [Exercises 01](./exercises-01.md)

## Additional Resources

- [Next.js Docs: Server and Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)
- [React Docs: Components](https://react.dev/learn/your-first-component)
- [React Docs: Passing Props](https://react.dev/learn/passing-props-to-a-component)

---

**Key Takeaways:**
- Server components are default and help ship less JS.
- Client components are for interactivity (state, effects, events, browser APIs).
- Compose server + client carefully across the boundary (serializable props).
- Strong prop types make components easier to use and refactor.
