# Common Next.js Patterns

## Layout Pattern

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```

## API Route Pattern

```typescript
// app/api/users/route.ts
export async function GET() {
  return Response.json({ users: [] });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ created: true });
}
```

## Error Handling Pattern

```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Error: {error.message}</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Loading Pattern

```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```
