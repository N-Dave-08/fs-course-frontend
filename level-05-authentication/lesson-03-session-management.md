# Lesson 3: Session Management

## Login Function

```typescript
async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  const { token } = await response.json();
  localStorage.setItem('token', token);
}
```

## Logout Function

```typescript
function logout() {
  localStorage.removeItem('token');
  router.push('/login');
}
```

## Auth Context

```typescript
'use client';

import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```
