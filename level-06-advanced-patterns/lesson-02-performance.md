# Lesson 2: Performance

## Server Components

Use Server Components to reduce bundle size:

```typescript
// This doesn't add to client bundle
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

## Streaming

Next.js streams Server Components:

```typescript
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Caching

```typescript
// Revalidate every 60 seconds
const data = await fetch(url, {
  next: { revalidate: 60 }
});
```
