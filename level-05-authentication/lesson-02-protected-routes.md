# Lesson 2: Protected Routes

## Auth Check Component

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  if (!token) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}
```

## Middleware (App Router)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```
