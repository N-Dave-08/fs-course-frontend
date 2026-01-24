# Lesson 1: API Client Setup

## Creating API Client

```typescript
// lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
```

## Using the Client

```typescript
import { apiClient } from '@/lib/api-client';

const users = await apiClient<User[]>('/api/users');
```
