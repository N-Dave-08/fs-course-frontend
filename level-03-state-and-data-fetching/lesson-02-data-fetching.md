# Lesson 2: Data Fetching

## Server Components (Recommended)

Fetch data in Server Components:

```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Client-Side Fetching

For Client Components:

```typescript
"use client";

import { useEffect, useState } from 'react';

export default function ClientPosts() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);
  
  return <div>{/* render posts */}</div>;
}
```

## Loading States

```typescript
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```
