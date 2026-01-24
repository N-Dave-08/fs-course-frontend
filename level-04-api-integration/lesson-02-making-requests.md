# Lesson 2: Making Requests

## GET Request

```typescript
const users = await apiClient<User[]>('/api/users');
```

## POST Request

```typescript
const newUser = await apiClient<User>('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice', email: 'alice@example.com' }),
});
```

## Error Handling

```typescript
try {
  const data = await apiClient('/api/data');
} catch (error) {
  console.error('Failed to fetch:', error);
  // Handle error
}
```
