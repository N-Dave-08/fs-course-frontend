# Exercises 03: State and Data Fetching

## Learning Objectives

By completing these exercises, you will:
- ✅ Use React hooks (useState, useEffect)
- ✅ Manage component state
- ✅ Fetch data in Client Components
- ✅ Fetch data in Server Components
- ✅ Create custom hooks
- ✅ Handle loading and error states

## Before You Start

**Prerequisites:**
- Next.js basics (Level 1)
- Understanding of React hooks
- TypeScript knowledge
- Basic `fetch` knowledge (you’ll build a stronger API client in Level 4)

**Setup:**
1. Navigate to `fs-course-frontend/level-03-state-and-data-fetching/`
2. Ensure Next.js project is set up
3. All exercises should be created in `project/src/`

---

## Exercise 1: useState Hook

**Objective:** Create a form component using useState.

**Instructions:**
Create `project/src/components/NameForm.tsx` that:
1. Has input field for name
2. Displays name as you type
3. Uses useState to manage state

**Expected Code Structure:**
```typescript
// project/src/components/NameForm.tsx
"use client";

import { useState } from 'react';

export default function NameForm() {
  const [name, setName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Name Form</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Enter your name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your name..."
          />
        </div>

        {name && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900">
              Hello, <span className="font-semibold">{name}</span>!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Verification Steps:**
1. Add component to a page
2. Type in input field
3. Name should update in real-time
4. No page refresh needed

**Expected Behavior:**
- Input updates state
- Display updates immediately
- State persists while component mounted

**Hints:**
- Must use `"use client"` for hooks
- `useState` returns [value, setter]
- Controlled input: `value` and `onChange`

**Common Mistakes:**
- ❌ Forgetting `"use client"`
- ❌ Not using controlled input
- ❌ Wrong event handler type

**File:** `project/src/components/NameForm.tsx`

---

## Exercise 2: useEffect Hook

**Objective:** Fetch data on component mount.

**Instructions:**
Create `project/src/components/DataFetcher.tsx` that:
1. Fetches data on mount
2. Displays loading state
3. Shows data when loaded
4. Handles errors

**Expected Code Structure:**
```typescript
// project/src/components/DataFetcher.tsx
"use client";

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function DataFetcher() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Empty dependency array = run once on mount

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-3 bg-gray-50 rounded">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Verification Steps:**
1. Component shows loading initially
2. Data loads and displays
3. Error handling works (test with invalid URL)

**Expected Behavior:**
- Loading state shown
- Data fetched on mount
- Error state handled
- Cleanup on unmount (optional)

**Hints:**
- `useEffect` runs after render
- Empty deps `[]` = run once
- Always handle loading/error states

**Common Mistakes:**
- ❌ Not handling loading state
- ❌ Not handling errors
- ❌ Missing dependency array
- ❌ Infinite loops (wrong deps)

**File:** `project/src/components/DataFetcher.tsx`

---

## Exercise 3: Server Component Data Fetching

**Objective:** Fetch data in Server Component.

**Instructions:**
Create `project/src/app/data/page.tsx` that:
1. Fetches data in Server Component
2. Displays the data
3. No client-side JavaScript needed

**Expected Code Structure:**
```typescript
// project/src/app/data/page.tsx
// No "use client" - this is a Server Component

interface Post {
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  // This runs on the server
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // Don't cache (or use 'force-cache' for caching)
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return response.json();
}

export default async function DataPage() {
  // This runs on the server
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Posts</h1>
        
        <div className="space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Verification Steps:**
1. Visit the page
2. Data should be in HTML (view source)
3. No loading state (rendered on server)
4. Fast initial load

**Expected Behavior:**
- Data fetched on server
- HTML includes data
- No client-side fetch
- Better SEO and performance

**Hints:**
- No `"use client"` needed
- Can use `async` in Server Components
- Fetch runs on server
- Data in initial HTML

**Common Mistakes:**
- ❌ Adding `"use client"` unnecessarily
- ❌ Not using async/await
- ❌ Trying to use hooks in Server Component

**File:** `project/src/app/data/page.tsx`

---

## Exercise 4: Custom Hook

**Objective:** Create a reusable custom hook.

**Instructions:**
Create `project/src/hooks/useLocalStorage.ts`:
1. Stores value in localStorage
2. Syncs with component state
3. Use in a component

**Expected Code Structure:**
```typescript
// project/src/hooks/useLocalStorage.ts
"use client";

import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
```

**Usage Example:**
```typescript
// project/src/components/Settings.tsx
"use client";

import useLocalStorage from '@/hooks/useLocalStorage';

export default function Settings() {
  const [theme, setTheme] = useLocalStorage<string>('theme', 'light');
  const [language, setLanguage] = useLocalStorage<string>('language', 'en');

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Settings are saved to localStorage and persist across page refreshes.
      </p>
    </div>
  );
}
```

**Verification Steps:**
1. Use hook in component
2. Change value
3. Refresh page - value persists
4. Check localStorage in dev tools

**Expected Behavior:**
- Values persist in localStorage
- State syncs with localStorage
- Works across page refreshes
- Handles SSR (window undefined)

**Hints:**
- Check `window` for SSR safety
- Use JSON for serialization
- Handle errors gracefully
- Custom hooks start with `use`

**Common Mistakes:**
- ❌ Not checking `window` (SSR error)
- ❌ Not handling JSON errors
- ❌ Forgetting `"use client"`

**File:** `project/src/hooks/useLocalStorage.ts` and usage component

---

## Exercise 5: Data fetching libraries (axios / React Query)

**Objective:** Practice using a dedicated HTTP client and a client caching library; learn how to integrate them into a Next.js app and common pitfalls.

---

### 📋 Tasks & Implementation

#### **Task A: Axios & Request Interceptor** ✅ (Required)

Set up a centralized axios instance with automatic authentication header injection:

1. **Create axios instance** at `project/src/lib/api.ts`
   - Configure sensible `baseURL` from `process.env.NEXT_PUBLIC_API_URL`
   - Add request interceptor to attach `Authorization: Bearer <token>`
   - Token sourced from `localStorage` when available

2. **Create axios-based component** at `project/src/components/DataFetcherAxios.tsx`
   - Replace fetch-based logic from Exercise 2
   - Use the axios instance for all requests
   - Maintain loading/error/success state handling

---

#### **Task B: React Query (TanStack Query) Integration** ✅ (Required)

Implement powerful client-side caching and synchronization:

1. **Install & setup React Query**
   - Add `@tanstack/react-query` to dependencies
   - Wrap app in `QueryClientProvider` at `project/src/app/layout.tsx`

2. **Create query component** at `project/src/components/PostsListRQ.tsx`
   - Use `useQuery(['posts'], fetchPosts)` hook
   - Call axios instance: `api.get('/posts').then(r => r.data)`
   - Handle loading, error, and success states

3. **Create mutation component** at `project/src/components/CreatePostForm.tsx`
   - Use `useMutation` to post new data
   - Implement optimistic updates
   - Invalidate posts query on success

---

#### **Task C: Pagination** 🚀 (Optional Advanced)

Choose one approach for handling paginated data:

| Approach | Use Case | Complexity |
|----------|----------|-----------|
| **Infinite Query** (`useInfiniteQuery`) | Infinite scroll, continuous loading | Medium |
| **Manual "Load More"** | Explicit user control | Low |

Implementation options:
- Use `getNextPageParam` and `fetchNextPage` from React Query
- OR manually call `/api/posts?page=2`, append results to existing data

---

### 📝 Expected Code Structure

**Expected Code Structure (snippets):**

##### `project/src/lib/api.ts`
```typescript
import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || '' });

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

##### `project/src/app/layout.tsx` (QueryClient Provider)
```tsx
"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

##### `project/src/components/PostsListRQ.tsx`
```tsx
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

function fetchPosts() { return api.get('/posts').then(r => r.data); }

export function PostsList() {
  const { data, isLoading, error } = useQuery(['posts'], fetchPosts);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{data.map((p: any) => <div key={p.id}>{p.title}</div>)}</div>;
}
```

---

### ✅ Verification Checklist

- [ ] **Axios Setup**: Component loads data correctly; Authorization header present when token exists
- [ ] **React Query**: `PostsList` uses `useQuery`, shows loading/error/success states
- [ ] **Mutations**: `CreatePostForm` successfully posts data with optimistic updates
- [ ] **Query Invalidation**: Posts list refreshes after creating new post
- [ ] **(Optional) Pagination**: Load more button or infinite scroll works; handles end-of-list

**Testing Tips:**
1. Open DevTools → Network tab to verify Authorization headers
2. Add token to localStorage, verify header is sent
3. Test error states with invalid URLs
4. Create a post and confirm list updates immediately (optimistic) then again after server confirms

---

### 💡 Hints & Best Practices

| Aspect | Recommendation |
|--------|-----------------|
| **Auth Headers** | Use interceptors for centralized token injection |
| **Client vs Server** | Keep React Query in client components; use Server Components for initial render |
| **Caching** | Let React Query handle cache invalidation—don't manually refetch |
| **Error Handling** | Provide user-friendly error messages, not raw API responses |
| **Secrets** | Never use `NEXT_PUBLIC_*` for private keys or auth tokens |

---

### ⚠️ Common Mistakes

| Mistake | Impact | Solution |
|---------|--------|----------|
| **Missing `QueryClientProvider`** | Queries silently fail; no data loads | Wrap app root in provider |
| **Storing tokens in `NEXT_PUBLIC_*`** | Security vulnerability | Use environment variables or secure storage |
| **Not invalidating cache** | Stale data displayed after mutations | Call `queryClient.invalidateQueries({queryKey: ['posts']})` |
| **Forgetting to type response data** | `any` types everywhere; type errors missed | Define `interface Post {}` and use generics: `useQuery<Post[]>` |
| **Updating axios instance after init** | Interceptors not applied | Create instance once and export; reuse everywhere |

---

### 📦 Required Files

Complete these files to pass verification:

- ✅ `project/src/lib/api.ts` — Axios instance with interceptor
- ✅ `project/src/components/DataFetcherAxios.tsx` — Axios-based data fetcher
- ✅ `project/src/components/PostsListRQ.tsx` — React Query with `useQuery`
- ✅ `project/src/components/CreatePostForm.tsx` — React Query with `useMutation`
- ⭐ **(Optional)** `project/src/components/PaginationComponent.tsx` — Infinite query or manual load more

---

## Advanced Exercises

These exercises deepen your understanding of React state management and testing patterns. Build on the fundamentals from Exercises 1-5.

---

### 🎯 Exercise A.1: Form State with `useReducer` + Testing

**Objective:** Master complex form state management and unit test reducer logic.

**Difficulty:** 🟡 Intermediate | **Time:** 2-3 hours

#### Tasks

1. **Create reducer hook**
   - File: `project/src/components/formReducer.ts`
   - Implement explicit action types (CHANGE_FIELD, RESET, SET_ERROR, SUBMIT)
   - Handle form state transitions (initial → editing → submitted)

2. **Build form component**
   - File: `project/src/components/FormWithReducer.tsx`
   - Use `useReducer` to manage multi-field form state
   - Support fields: name, email, password
   - Validate on submit, show errors inline

3. **Write reducer tests**
   - File: `project/src/components/__tests__/formReducer.test.ts`
   - Test each action type
   - Test error states and edge cases
   - Test field updates and reset

#### Expected Behavior

| Scenario | Expected | Implementation |
|----------|----------|-----------------|
| Type in field | State updates | Dispatch CHANGE_FIELD action |
| Submit form | Validates fields | Reducer validates in SUBMIT action |
| Reset button | Clear all fields | Dispatch RESET action clears state |
| Invalid email | Show error | Reducer catches validation error |

#### Verification
- [ ] Reducer tests pass (all action types covered)
- [ ] Form component renders and updates correctly
- [ ] Error messages appear on validation failure
- [ ] Reset button clears form completely

#### Hints
- Use TypeScript discriminated unions for action types
- Test reducer in isolation (pure function testing)
- Keep reducer logic separate from component logic

---

### ⚡ Exercise A.2: Debounced Search Hook + Testing

**Objective:** Create reusable hooks and test async/timer behavior.

**Difficulty:** 🟡 Intermediate | **Time:** 2 hours

#### Tasks

1. **Create debounce hook**
   - File: `project/src/hooks/useDebouncedValue.ts`
   - Parameter: `value` (T), `delay` (ms)
   - Returns: debounced value
   - Cleanup on unmount

2. **Build search component**
   - File: `project/src/components/SearchWithDebounce.tsx`
   - Use debounced hook for search input
   - Show results only after debounce delay
   - Display loading state while searching

3. **Write integration tests**
   - File: `project/src/hooks/__tests__/useDebouncedValue.test.ts`
   - Use fake timers (jest.useFakeTimers)
   - Test debounce delay timing
   - Test cleanup on unmount
   - Test rapid input changes

#### Expected Behavior

```
User types: "a" → "ab" → "abc" → [waits 500ms] → api call with "abc"
(Not separate calls for "a", "ab", "abc")
```

#### Verification
- [ ] Hook delays value updates by specified ms
- [ ] Cleanup runs on unmount
- [ ] Multiple rapid changes only trigger one final update
- [ ] Tests use fake timers (jest.useFakeTimers)

#### Hints
- Use `useEffect` with timeout cleanup
- Test with `jest.useFakeTimers()` and `jest.runAllTimers()`
- Remember to call `jest.useRealTimers()` after test

---

### 🏪 Exercise A.3: Global State with `zustand`

**Objective:** Learn lightweight state management alternative to Context API.

**Difficulty:** 🟡 Intermediate | **Time:** 1.5-2 hours

#### Tasks

1. **Create zustand store**
   - File: `project/src/store/useAppStore.ts`
   - State: `count` (number), `theme` (string)
   - Actions: `inc()`, `dec()`, `toggleTheme()`

2. **Update components**
   - File: `project/src/components/ThemeToggle.tsx`
   - Use `useAppStore()` for theme state
   - Remove Context provider dependency

3. **Add migration guide**
   - File: `project/docs/zustand-migration.md`
   - Explain Context vs `zustand` tradeoffs
   - Show before/after code examples
   - When to use each approach

#### Store Implementation Checklist

```typescript
// Rough structure:
import { create } from 'zustand';

type AppStore = {
  count: number;
  theme: 'light' | 'dark';
  inc: () => void;
  toggleTheme: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  // initial state
  // actions
}));
```

#### Verification
- [ ] `useAppStore()` works in components (no provider needed)
- [ ] State updates trigger re-renders
- [ ] ThemeToggle component reads/updates `theme`
- [ ] Migration guide explains Context vs zustand
- [ ] Components don't require `QueryClientProvider` style wrapping

#### Hints
- No provider needed—zustand handles state globally
- Selectors prevent unnecessary re-renders: `useAppStore(s => s.count)`
- Smaller bundles than Redux/Context for simple state

#### Tradeoffs Table

| Aspect | Context API | Zustand |
|--------|-------------|---------|
| **Boilerplate** | 🔴 High | 🟢 Low |
| **Bundle Size** | 🟢 Built-in | 🟡 ~1KB |
| **Learning Curve** | 🟡 Medium | 🟢 Easy |
| **Best For** | Theme/Auth | Any state |
| **Devtools** | Basic | 🟢 Great |

---

## Advanced Exercises Summary

| Exercise | Focus | Difficulty | Est. Time |
|----------|-------|-----------|-----------|
| **A.1** | `useReducer` + Testing | 🟡 Intermediate | 2-3h |
| **A.2** | Custom Hooks + Async Tests | 🟡 Intermediate | 2h |
| **A.3** | Global State Management | 🟡 Intermediate | 1.5-2h |

**Total Time:** ~5.5-7 hours for all advanced exercises

---

### 📋 All Required Files

#### Exercise A.1
- ✅ `project/src/components/FormWithReducer.tsx`
- ✅ `project/src/components/formReducer.ts`
- ✅ `project/src/components/__tests__/formReducer.test.ts`

#### Exercise A.2
- ✅ `project/src/hooks/useDebouncedValue.ts`
- ✅ `project/src/components/SearchWithDebounce.tsx`
- ✅ `project/src/hooks/__tests__/useDebouncedValue.test.ts`

#### Exercise A.3
- ✅ `project/src/store/useAppStore.ts`
- ✅ `project/src/components/ThemeToggle.tsx` (updated)
- ✅ `project/docs/zustand-migration.md`

---

### 🚀 Next Steps After Advanced Exercises

1. **Combine patterns:** Try using `useReducer` + `zustand` together
2. **Test more:** Add React Testing Library tests alongside your unit tests
3. **Optimize:** Use React DevTools Profiler to measure performance
4. **Explore:** Look at how established projects use these patterns


## Running Exercises

### Start Development Server

```bash
cd project
pnpm dev
```

### Test Components

1. **NameForm** (`project/src/components/NameForm.tsx`)
  - Add the component to a development page (e.g., `project/src/app/page.tsx`) and verify typing updates the UI in real time.
  - Expected: input updates state immediately, no full-page reload, and displayed greeting updates.

2. **DataFetcher** (`project/src/components/DataFetcher.tsx` or `project/src/components/DataFetcherAxios.tsx`)
  - Add to a page and verify loading → data → success flow. Simulate an error (bad URL) to verify error UI.
  - Expected: loading indicator appears, fetched items render, and errors show a clear message.

3. **Data Page** (`project/src/app/data/page.tsx`)
  - Visit `/data` in the browser and view page source (or disable JS) to confirm the posts are present in the server-rendered HTML.
  - Expected: initial HTML contains posts (no client fetch needed) and page loads without client-side spinner.

4. **Custom Hook** (`project/src/hooks/useLocalStorage.ts`) and usage (e.g., `project/src/components/Settings.tsx`)
  - Use the hook in the Settings component, change values, refresh the page, and confirm values persist in `localStorage`.
  - Expected: values persist across reloads; hook handles SSR safely (no server errors).

## Verification Checklist

After completing all exercises, verify:

- [ ] useState manages state correctly
- [ ] useEffect fetches data on mount
- [ ] Loading states work
- [ ] Error states work
- [ ] Server Component fetches work
- [ ] Custom hook works and is reusable
- [ ] localStorage persistence works
- [ ] All components are type-safe

## Troubleshooting

### Issue: useState not updating

**Solution:**
- Check `"use client"` directive
- Verify setter is called
- Check for stale closures

### Issue: useEffect infinite loop

**Solution:**
- Check dependency array
- Ensure dependencies are correct
- Use useCallback for functions

### Issue: Server Component fetch error

**Solution:**
- Check fetch URL
- Verify async/await
- Check for `"use client"` (shouldn't have it)

## Next Steps

1. ✅ **Review**: Understand hooks and data fetching
2. ✅ **Experiment**: Create more custom hooks
3. 📖 **Continue**: Move to [Level 4: API Integration](../level-04-api-integration/lesson-01-api-client-setup.md)
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- useState manages component state
- useEffect handles side effects
- Server Components fetch on server
- Custom hooks enable code reuse
- Always handle loading/error states
- localStorage persists data client-side
- TypeScript ensures type safety

**Good luck! Happy coding! 🚀**
