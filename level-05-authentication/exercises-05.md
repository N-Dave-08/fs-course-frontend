# Exercises 05: Authentication

## Learning Objectives

By completing these exercises, you will:
- ✅ Create login form component
- ✅ Implement protected routes
- ✅ Create authentication context
- ✅ Manage auth state
- ✅ Handle token storage
- ✅ Redirect based on auth status

## Before You Start

**Prerequisites:**
- Next.js basics
- State management (Level 3)
- API integration (Level 4)
- Backend API with auth (from fs-course-backend)

**Setup:**
1. Navigate to `fs-course-frontend/level-05-authentication/`
2. Ensure backend auth API is running
3. All exercises should be created in `project/src/`

---

## Exercise 1: Login Form

**Objective:** Create a login form component.

**Instructions:**
Create `project/src/app/login/page.tsx` that:
1. Has email and password inputs
2. Handles form submission
3. Calls login API
4. Stores token on success

**Expected Code Structure:**
```typescript
// project/src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, ApiError } from "@/lib/api-client";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string;
    };
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.success && response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as ApiError).message)
          : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Verification:**
- Form submits correctly
- Token stored in localStorage
- Redirects on success
- Error handling works

**File:** `project/src/app/login/page.tsx`

---

## Exercise 2: Protected Route

**Objective:** Create protected dashboard page.

**Instructions:**
Create `project/src/app/dashboard/page.tsx` that:
1. Checks for authentication token
2. Redirects to login if not authenticated
3. Shows dashboard content if authenticated

**Expected Code Structure:**
```typescript
// project/src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
- Redirects when not authenticated
- Shows content when authenticated
- Logout works
- Token checked on load

**File:** `project/src/app/dashboard/page.tsx`

---

## Exercise 3: Auth Context

**Objective:** Create reusable authentication context.

**Instructions:**
Create `project/src/contexts/AuthContext.tsx`:
1. Manages user state
2. Provides login/logout functions
3. Use throughout app

**Expected Code Structure:**
```typescript
// project/src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient, ApiError } from "@/lib/api-client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient<{
        success: boolean;
        data: { token: string; user: User };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as ApiError).message)
          : "Login failed";
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Usage in Layout:**
```typescript
// project/src/app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

**Usage in Components:**
```typescript
import { useAuth } from '@/contexts/AuthContext';

function Component() {
  const { user, logout, isAuthenticated } = useAuth();
  // Use auth state
}
```

**Verification:**
- Context provides auth state
- Login/logout work
- State persists
- Can use throughout app

**File:** `project/src/contexts/AuthContext.tsx`

---

## Running Exercises

### Start Backend

```bash
# In fs-course-backend
cd project
pnpm dev
```

### Start Frontend

```bash
# In fs-course-frontend
cd project
pnpm dev
```

### Test Flow

1. Visit `/login`
2. Login with credentials
3. Should redirect to `/dashboard`
4. Logout should work
5. Should redirect back to login

## Verification Checklist

After completing all exercises, verify:

- [ ] Login form works
- [ ] Token stored correctly
- [ ] Protected routes work
- [ ] Redirects work
- [ ] Auth context works
- [ ] State persists
- [ ] Logout works
- [ ] All code is type-safe

## Troubleshooting

### Issue: Token not persisting

**Solution:**
- Check localStorage usage
- Verify token is string
- Check browser console

### Issue: Redirect loops

**Solution:**
- Check auth check logic
- Verify token validation
- Check useEffect dependencies

## Next Steps

1. ✅ **Review**: Understand authentication flow
2. ✅ **Experiment**: Add token refresh
3. 📖 **Continue**: Move to [Level 6: Advanced Patterns](../level-06-advanced-patterns/lesson-01-optimization.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Store tokens securely (localStorage for SPAs)
- Protect routes with checks
- Use context for global auth state
- Always handle loading states
- Redirect based on auth status
- Clear tokens on logout
- Validate tokens on app load

**Good luck! Happy coding! 🚀**
