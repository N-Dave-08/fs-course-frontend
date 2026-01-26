# Exercises 04: API Integration

## Learning Objectives

By completing these exercises, you will:
- ✅ Create API client utilities
- ✅ Fetch data in Next.js components
- ✅ Handle POST requests
- ✅ Manage loading and error states
- ✅ Integrate with backend API
- ✅ Practice async data fetching

## Before You Start

**Prerequisites:**
- Next.js basics
- State and data fetching (Level 3)
- Backend API running (from fs-course-backend)
- Understanding of REST APIs

**Setup:**
1. Navigate to `fs-course-frontend/level-04-api-integration/`
2. Ensure backend API is running on port 3001
3. All exercises should be created in `project/src/`

---

## Exercise 1: API Client

**Objective:** Create a reusable API client utility.

**Instructions:**
Create `project/src/lib/api-client.ts` that:
1. Builds full URLs from a base URL
2. Handles JSON requests/responses consistently
3. Represents API errors in a predictable shape (so UI can handle them)

**Expected Code Structure:**
```typescript
// project/src/lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let details: unknown = undefined;
    try {
      details = await response.json();
    } catch {
      // empty or non-JSON error body
    }

    const error: ApiError = {
      status: response.status,
      message: response.statusText || "Request failed",
      details,
    };
    throw error;
  }

  return response.json();
}
```

**Verification:**
- API client works
- Error handling works
- Base URL from env

**File:** `project/src/lib/api-client.ts`

---

## Exercise 2: Fetch Users

**Objective:** Create page that fetches and displays users.

**Instructions:**
Create `project/src/app/users/page.tsx` that:
1. Fetches users from API
2. Displays user list
3. Handles loading and error states

**Expected Code Structure:**
```typescript
// project/src/app/users/page.tsx
import { apiClient } from "@/lib/api-client";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User[];
}

async function getUsers(): Promise<User[]> {
const response = await apiClient<ApiResponse>("/api/users");
  return response.data;
}

export default async function UsersPage() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    users = await getUsers();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch users';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-900 mb-2">Error</h2>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Users</h1>
        
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
- Users fetched on server
- Displayed correctly
- Error handling works

**File:** `project/src/app/users/page.tsx`

---

## Exercise 3: POST Request

**Objective:** Create form that submits data to API.

**Instructions:**
Create `project/src/components/UserForm.tsx` that:
1. Submits data to API
2. Shows success/error messages
3. Resets form on success

**Expected Code Structure:**
```typescript
// project/src/components/UserForm.tsx
"use client";

import { useState } from 'react';
import { apiClient, ApiError } from "@/lib/api-client";

interface UserFormData {
  name: string;
  email: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await apiClient("/api/users", { method: "POST", body: JSON.stringify(formData) });
      setSuccess(true);
      setFormData({ name: '', email: '' }); // Reset form
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err && "message" in err
          ? String((err as ApiError).message)
          : "Failed to create user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-bold mb-4">Create User</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-red-800">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded p-3 text-green-800">
          User created successfully!
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

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
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

**Verification:**
- Form submits correctly
- Success message shows
- Error handling works
- Form resets on success

**File:** `project/src/components/UserForm.tsx`

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

### Test Integration

1. Visit `/users` - should fetch from backend
2. Use UserForm - should create users
3. Check backend logs - requests should appear

## Verification Checklist

After completing all exercises, verify:

- [ ] API client works correctly
- [ ] GET requests work
- [ ] POST requests work
- [ ] Error handling works
- [ ] Loading states work
- [ ] Success states work
- [ ] Frontend connects to backend
- [ ] All code is type-safe

## Troubleshooting

### Issue: "Failed to fetch"

**Solution:**
- Check backend is running
- Verify API URL in .env
- Check CORS settings
- Verify endpoint paths

### Issue: CORS errors

**Solution:**
- Configure CORS on backend
- Check allowed origins
- Verify headers

## Next Steps

1. ✅ **Review**: Understand API integration
2. ✅ **Experiment**: Add more API calls
3. 📖 **Continue**: Move to [Level 5: Authentication](../level-05-authentication/lesson-01-auth-concepts.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- API client centralizes fetch logic
- Server Components fetch on server
- Client Components handle forms
- Always handle loading/error states
- Use environment variables for URLs
- Type API responses
- Error handling is critical

**Good luck! Happy coding! 🚀**
