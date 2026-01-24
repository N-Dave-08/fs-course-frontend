# Next.js Cheatsheet

## Pages and Routing

```typescript
// app/page.tsx → /
export default function Home() {
  return <div>Home</div>;
}

// app/about/page.tsx → /about
export default function About() {
  return <div>About</div>;
}

// app/blog/[slug]/page.tsx → /blog/[slug]
export default function BlogPost({ params }) {
  return <div>{params.slug}</div>;
}
```

## Navigation

```typescript
import Link from 'next/link';

<Link href="/about">About</Link>
```

## Data Fetching

```typescript
// Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```

## Client Components

```typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

## Image Optimization

```typescript
import Image from 'next/image';

<Image src="/image.jpg" alt="Description" width={500} height={300} />
```
