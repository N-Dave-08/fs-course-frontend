# Lesson 3: Error Handling

## Try-Catch in Server Components

```typescript
export default async function Page() {
  try {
    const data = await fetchData();
    return <div>{data}</div>;
  } catch (error) {
    return <div>Error loading data</div>;
  }
}
```

## Error Boundaries

Create `app/error.tsx`:

```typescript
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

## Loading States

```typescript
// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```
