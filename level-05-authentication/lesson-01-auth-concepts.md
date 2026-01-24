# Lesson 1: Authentication Concepts

## Authentication Flow

1. User submits credentials
2. Server validates and returns token
3. Client stores token (localStorage/cookies)
4. Include token in API requests
5. Server validates token on each request

## JWT Tokens

JSON Web Tokens are commonly used:

```typescript
// Store token
localStorage.setItem('token', jwtToken);

// Include in requests
headers: {
  'Authorization': `Bearer ${token}`
}
```

## Session Management

```typescript
// lib/auth.ts
export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function setToken(token: string): void {
  localStorage.setItem('token', token);
}

export function removeToken(): void {
  localStorage.removeItem('token');
}
```
