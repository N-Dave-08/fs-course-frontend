# Lesson 3: Server Components

## Server Components by Default

In App Router, components are Server Components by default:

```typescript
// This runs on the server
export default async function Page() {
  const data = await fetchFromDatabase();
  return <div>{data}</div>;
}
```

## Benefits

- **No JavaScript bundle**: Reduces client bundle size
- **Direct database access**: Can query databases directly
- **Better security**: API keys stay on server
- **Faster initial load**: Pre-rendered on server

## When to Use Client Components

Use `"use client"` for:
- Interactivity (onClick, onChange)
- Browser APIs (localStorage, window)
- React hooks (useState, useEffect)
- Third-party libraries requiring client

## Combining Server and Client

```typescript
// Server Component
export default function Page() {
  const data = await fetchData();
  
  return (
    <div>
      <ServerData data={data} />
      <ClientInteractive />
    </div>
  );
}
```
