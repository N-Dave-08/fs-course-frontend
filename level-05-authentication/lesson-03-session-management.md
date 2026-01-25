# Lesson 3: Session Management

## Learning Objectives

By the end of this lesson, you will be able to:
- Explain what a “session” is in web apps (and how it differs from a token)
- Implement login/logout flows that update UI state predictably
- Store and retrieve auth state safely in client components
- Use an `AuthProvider` + `useAuth()` hook to share auth state across the app
- Recognize common pitfalls (missing JSON headers, stale auth state, localStorage in SSR)

## Why Session Management Matters

Authentication isn’t just “log in once”. Your app must manage:
- whether the user is logged in
- who the user is (profile/claims)
- how to attach auth to API calls
- how to log out and clear state

```mermaid
flowchart LR
  login[Login] --> store[StoreAuth]
  store --> requests[AttachToRequests]
  requests --> user[UserState]
  user --> logout[Logout]
  logout --> clear[ClearAuth]
```

## Login (Token-Based Example)

This example logs in and stores a token in `localStorage`.

```typescript
async function login(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const { token } = (await response.json()) as { token: string };
  localStorage.setItem("token", token);
}
```

### Why we set JSON headers

Without `Content-Type: application/json`, many backends won’t parse the body correctly.

## Logout

```typescript
function logout(router: { push: (path: string) => void }) {
  localStorage.removeItem("token");
  router.push("/login");
}
```

In a cookie-based session system, logout usually calls a backend endpoint to clear the cookie/session server-side.

## Sharing Auth State with Context

Context lets you access auth state anywhere in your component tree.

```typescript
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = { id: string; email: string } | null;

type AuthContextValue = {
  user: User;
  setUser: (user: User) => void;
  token: string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Browser-only
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, setUser, token, logout }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
```

### Where to put the provider

In App Router, you often place it in a layout:
- `app/layout.tsx` for global auth state
- or a specific segment layout for authenticated sections only

## Real-World Scenario: “Who am I?” Bootstrap

Common production pattern:
- store a session credential (cookie or token)
- on app load, call `/me` (or `/api/auth/me`) to fetch the current user
- set `user` in context

This keeps UI consistent across refreshes.

## Best Practices

### 1) Don’t read `localStorage` during server rendering

Read it in a client component effect, or prefer cookies for server-driven auth.

### 2) Keep UI state and auth credentials in sync

When you log out, clear both token and user state to avoid stale UI.

### 3) Avoid storing sensitive user data in localStorage

Store minimal credentials; fetch user profile from the backend as needed.

## Common Pitfalls and Solutions

### Pitfall 1: Missing JSON headers

**Problem:** backend receives empty body or fails to parse.

**Solution:** Add `headers: { "Content-Type": "application/json" }`.

### Pitfall 2: UI thinks you’re logged in after logout

**Problem:** token removed but `user` state remains set.

**Solution:** Clear `user` state on logout (and consider redirect).

### Pitfall 3: Auth state flicker on first render

**Problem:** token is loaded after hydration; UI briefly renders “logged out”.

**Solution:** Track an “authReady” state or use middleware/cookies for server-driven gating.

## Troubleshooting

### Issue: Login succeeds but API requests still return 401

**Symptoms:**
- token exists but backend rejects requests

**Solutions:**
1. Confirm you attach `Authorization: Bearer <token>` to requests.
2. Confirm backend expects bearer tokens (vs cookies).
3. Confirm token hasn’t expired.

### Issue: "localStorage is not defined"

**Symptoms:**
- code runs in a server context

**Solutions:**
1. Ensure the file is a client component (`"use client"`).
2. Access `localStorage` only inside `useEffect`.

## Next Steps

Now that you can manage sessions:

1. ✅ **Practice**: Add an auth provider and show “Login/Logout” in the header
2. ✅ **Experiment**: Implement a `/me` call to hydrate `user` on page load
3. 📖 **Next Level**: Continue to advanced frontend patterns (optimization/performance/testing)
4. 💻 **Complete Exercises**: Work through [Exercises 05](./exercises-05.md)

## Additional Resources

- [Next.js Docs: Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
- [React Docs: Context](https://react.dev/learn/passing-data-deeply-with-context)

---

**Key Takeaways:**
- Session management keeps auth credentials and UI state consistent over time.
- Prefer safe storage patterns; be aware of XSS/CSRF trade-offs.
- Use an `AuthProvider` to share auth state across components.
- Keep logout behavior consistent: clear token + clear user + redirect if needed.
