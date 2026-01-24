# Exercises 01: Next.js Basics

## Learning Objectives

By completing these exercises, you will:
- ✅ Create pages using Next.js App Router
- ✅ Understand file-based routing
- ✅ Build Server and Client Components
- ✅ Implement navigation between pages
- ✅ Use TypeScript with React components
- ✅ Style components with Tailwind CSS

## Before You Start

**Prerequisites:**
- Next.js project set up (see [LEARNING-GUIDE.md](../../LEARNING-GUIDE.md))
- TypeScript knowledge (from fs-course-typescript)
- Basic React knowledge
- Tailwind CSS configured

**Setup:**
1. Navigate to `fs-course-frontend/level-01-nextjs-basics/`
2. Ensure your `project/` directory is set up with Next.js
3. All exercises should be created in `project/src/`

---

## Exercise 1: Create Home Page

**Objective:** Create your first Next.js page using the App Router.

**Instructions:**
Create `project/src/app/page.tsx` that:
1. Displays a welcome message
2. Adds a heading (h1) and paragraph
3. Styles with Tailwind CSS classes

**Expected Code Structure:**
```typescript
// project/src/app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Next.js!
        </h1>
        <p className="text-lg text-gray-600">
          This is your first Next.js page using the App Router.
        </p>
      </div>
    </div>
  );
}
```

**Verification Steps:**
1. Start dev server: `cd project && pnpm dev`
2. Visit `http://localhost:3000`
3. You should see the welcome message with styling

**Expected Output:**
- Centered welcome message
- Large heading
- Styled with Tailwind classes

**Hints:**
- Default export is required for pages
- Function name can be anything (convention: `HomePage` or `Page`)
- Use Tailwind utility classes for styling
- No need for `"use client"` - pages are Server Components by default

**Common Mistakes:**
- ❌ Forgetting `export default` - page won't be recognized
- ❌ Using `className` instead of `class` (React uses `className`)
- ❌ Not returning JSX - must return a single element or fragment

**File:** `project/src/app/page.tsx`

---

## Exercise 2: Create About Page

**Objective:** Create a new page and add navigation.

**Instructions:**
1. Create `project/src/app/about/page.tsx` with an About page
2. Add a navigation link from the home page to the About page
3. Test navigation between pages

**Step-by-Step:**

1. Create `project/src/app/about/page.tsx`:
```typescript
// project/src/app/about/page.tsx
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          This is the About page. Learn more about our application here.
        </p>
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
```

2. Update `project/src/app/page.tsx` to add navigation:
```typescript
// project/src/app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Next.js!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          This is your first Next.js page using the App Router.
        </p>
        <Link 
          href="/about"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to About Page
        </Link>
      </div>
    </div>
  );
}
```

**Verification Steps:**
1. Visit `http://localhost:3000`
2. Click "Go to About Page" link
3. Should navigate to `http://localhost:3000/about`
4. Click "Back to Home" link
5. Should navigate back to home

**Expected Behavior:**
- Navigation works without page refresh (client-side navigation)
- URLs change in browser address bar
- Page content updates smoothly

**Hints:**
- Use `Link` component from `next/link` for navigation
- `href` prop specifies the route
- Links enable client-side navigation (faster than full page reload)
- Route matches file structure: `/about` → `app/about/page.tsx`

**Common Mistakes:**
- ❌ Using `<a>` tag instead of `<Link>` - causes full page reload
- ❌ Wrong `href` path - must match file structure
- ❌ Forgetting to import `Link` from `next/link`

**File:** `project/src/app/about/page.tsx` and update `project/src/app/page.tsx`

---

## Exercise 3: Dynamic Route

**Objective:** Create a dynamic route that accepts parameters.

**Instructions:**
Create `project/src/app/users/[id]/page.tsx` that:
1. Accepts a dynamic `id` parameter
2. Displays the user ID on the page
3. Test with different IDs: `/users/1`, `/users/2`, etc.

**Expected Code Structure:**
```typescript
// project/src/app/users/[id]/page.tsx
interface PageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          User Profile
        </h1>
        <p className="text-lg text-gray-600">
          User ID: <span className="font-semibold">{params.id}</span>
        </p>
      </div>
    </div>
  );
}
```

**Verification Steps:**
1. Visit `http://localhost:3000/users/1`
2. Should display "User ID: 1"
3. Visit `http://localhost:3000/users/123`
4. Should display "User ID: 123"

**Expected Behavior:**
- Page displays different content based on URL parameter
- Parameter is accessible via `params.id`
- Works with any string value in the URL

**Hints:**
- Folder name `[id]` creates a dynamic segment
- `params` is always an object with string values
- Type the `params` prop with TypeScript interface
- Can have multiple dynamic segments: `[id]/[slug]`

**Common Mistakes:**
- ❌ Not typing the `params` prop - TypeScript error
- ❌ Using `params` directly without destructuring
- ❌ Expecting `params.id` to be a number (it's always a string)

**Advanced Challenge:**
Add validation to ensure `id` is a number, and show an error if it's not.

**File:** `project/src/app/users/[id]/page.tsx`

---

## Exercise 4: Navigation Component

**Objective:** Create a reusable navigation component.

**Instructions:**
Create `project/src/components/Navigation.tsx` that:
1. Creates a navigation component
2. Adds links to Home, About, and Contact pages
3. Uses Next.js `Link` component
4. Add it to the root layout so it appears on all pages

**Step-by-Step:**

1. Create `project/src/components/Navigation.tsx`:
```typescript
// project/src/components/Navigation.tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

2. Update `project/src/app/layout.tsx`:
```typescript
// project/src/app/layout.tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js App',
  description: 'Learning Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

**Verification Steps:**
1. Navigation should appear on all pages
2. Click each link - should navigate correctly
3. Navigation stays visible when navigating

**Expected Behavior:**
- Navigation bar at top of every page
- Links work correctly
- Hover effects work (if styled)
- Active link can be highlighted (advanced)

**Hints:**
- Components in `components/` folder are reusable
- Import using `@/components/Navigation` (if alias configured)
- Layout wraps all pages, so Navigation appears everywhere
- Can add active link styling using `usePathname()` hook (Client Component)

**Common Mistakes:**
- ❌ Not importing Navigation in layout
- ❌ Wrong import path - check your `tsconfig.json` alias
- ❌ Forgetting to create Contact page (link will 404)

**File:** `project/src/components/Navigation.tsx` and update `project/src/app/layout.tsx`

---

## Exercise 5: Server Component

**Objective:** Create and use a Server Component.

**Instructions:**
Create `project/src/components/ServerInfo.tsx` that:
1. Displays current timestamp (server-side)
2. Shows that it's a Server Component
3. Use it in a page

**Expected Code Structure:**
```typescript
// project/src/components/ServerInfo.tsx
export default function ServerInfo() {
  // This runs on the server
  const timestamp = new Date().toISOString();
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
      <h2 className="text-lg font-semibold text-blue-900 mb-2">
        Server Component
      </h2>
      <p className="text-blue-700">
        Current server time: <span className="font-mono">{timestamp}</span>
      </p>
      <p className="text-sm text-blue-600 mt-2">
        This component rendered on the server at page load.
      </p>
    </div>
  );
}
```

**Usage in a page:**
```typescript
// project/src/app/page.tsx
import ServerInfo from '@/components/ServerInfo';

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <ServerInfo />
    </div>
  );
}
```

**Verification Steps:**
1. Add component to a page
2. Refresh the page multiple times
3. Notice the timestamp updates on each refresh (server-side rendering)
4. View page source - timestamp is in HTML (not generated client-side)

**Expected Behavior:**
- Timestamp shows server time
- Updates on each page refresh
- No JavaScript needed - rendered on server
- Visible in page source HTML

**Hints:**
- Server Components are default in Next.js App Router
- No `"use client"` directive needed
- Can access server-side APIs, databases directly
- Rendered once on server, sent as HTML

**Common Mistakes:**
- ❌ Adding `"use client"` - makes it a Client Component
- ❌ Using hooks (useState, useEffect) - only work in Client Components
- ❌ Expecting timestamp to update without refresh

**File:** `project/src/components/ServerInfo.tsx`

---

## Exercise 6: Client Component

**Objective:** Create an interactive Client Component.

**Instructions:**
Create `project/src/components/Counter.tsx` that:
1. Creates a counter with `useState`
2. Adds increment and decrement buttons
3. Marks as Client Component with `"use client"`
4. Use it in a page

**Expected Code Structure:**
```typescript
// project/src/components/Counter.tsx
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-4">
      <h2 className="text-lg font-semibold text-green-900 mb-4">
        Client Component - Counter
      </h2>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Decrement
        </button>
        <span className="text-2xl font-bold text-green-900">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Increment
        </button>
      </div>
      <p className="text-sm text-green-600 mt-4">
        This component uses client-side interactivity.
      </p>
    </div>
  );
}
```

**Usage:**
```typescript
// project/src/app/page.tsx
import Counter from '@/components/Counter';

export default function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Counter />
    </div>
  );
}
```

**Verification Steps:**
1. Add component to a page
2. Click increment button - count should increase
3. Click decrement button - count should decrease
4. State persists while on the page

**Expected Behavior:**
- Counter starts at 0
- Buttons update count immediately
- No page refresh needed
- State managed client-side

**Hints:**
- Must use `"use client"` directive at top of file
- Can use React hooks (useState, useEffect, etc.)
- Interactivity requires Client Components
- Can be imported into Server Components

**Common Mistakes:**
- ❌ Forgetting `"use client"` - hooks won't work
- ❌ Using hooks in Server Components
- ❌ Not importing `useState` from 'react'

**File:** `project/src/components/Counter.tsx`

---

## Exercise 7: Typed Component

**Objective:** Create a TypeScript-typed component with props.

**Instructions:**
Create `project/src/components/Button.tsx` that:
1. Creates a Button component with TypeScript
2. Props: `label` (string), `onClick` (function), `variant` (optional)
3. Use it in a page

**Expected Code Structure:**
```typescript
// project/src/components/Button.tsx
"use client";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded font-semibold transition";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
}
```

**Usage:**
```typescript
// project/src/app/page.tsx
"use client";

import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      <Button 
        label="Primary Button" 
        onClick={() => alert('Clicked!')} 
      />
      <Button 
        label="Secondary Button" 
        onClick={() => console.log('Secondary')}
        variant="secondary"
      />
      <Button 
        label="Danger Button" 
        onClick={() => console.log('Danger')}
        variant="danger"
      />
    </div>
  );
}
```

**Verification Steps:**
1. Create component with TypeScript interface
2. Use component with different props
3. Try omitting optional props - should work
4. Try wrong prop types - TypeScript should show error

**Expected Behavior:**
- TypeScript autocomplete for props
- Type errors for wrong prop types
- Optional props work without errors
- Component renders with correct styling

**Hints:**
- Define props interface
- Use optional props with `?`
- Provide default values with destructuring
- TypeScript ensures type safety

**Common Mistakes:**
- ❌ Not defining props interface
- ❌ Wrong prop types
- ❌ Forgetting to destructure props
- ❌ Not handling optional props correctly

**File:** `project/src/components/Button.tsx`

---

## Exercise 8: Layout

**Objective:** Modify the root layout to include header and footer.

**Instructions:**
Modify `project/src/app/layout.tsx` to:
1. Add a header with navigation
2. Add a footer
3. Ensure all pages use this layout

**Expected Code Structure:**
```typescript
// project/src/app/layout.tsx
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Learning App',
  description: 'Learning Next.js with TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <Navigation />
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 Next.js Learning App. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

**Verification Steps:**
1. Check all pages have header and footer
2. Navigation works from header
3. Footer appears at bottom of all pages
4. Layout is consistent across pages

**Expected Behavior:**
- Header with navigation on all pages
- Footer at bottom of all pages
- Main content in between
- Consistent layout structure

**Hints:**
- Layout wraps all pages automatically
- Use flexbox for sticky footer
- Can add global styles here
- Metadata applies to all pages

**Common Mistakes:**
- ❌ Not wrapping children in layout
- ❌ Footer not sticking to bottom
- ❌ Forgetting to import Navigation
- ❌ Wrong HTML structure

**File:** `project/src/app/layout.tsx`

---

## Running Exercises

### Start Development Server

```bash
cd project
pnpm dev
```

Visit `http://localhost:3000` to see your application.

### Test Each Exercise

1. **Home Page**: `http://localhost:3000`
2. **About Page**: `http://localhost:3000/about`
3. **User Pages**: `http://localhost:3000/users/1`, `/users/2`, etc.
4. **Navigation**: Click links in header
5. **Components**: See ServerInfo and Counter on pages

## Verification Checklist

After completing all exercises, verify:

- [ ] Home page displays correctly
- [ ] About page exists and navigates from home
- [ ] Dynamic user routes work with different IDs
- [ ] Navigation component appears on all pages
- [ ] ServerInfo shows server timestamp
- [ ] Counter component is interactive
- [ ] Button component accepts typed props
- [ ] Layout includes header and footer on all pages
- [ ] No TypeScript errors
- [ ] No console errors in browser

## Troubleshooting

### Issue: "Module not found" errors

**Solution:**
```bash
cd project
pnpm install
```

### Issue: Pages not updating

**Solution:**
- Check that dev server is running
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

### Issue: Navigation not working

**Solution:**
- Ensure using `Link` from `next/link`, not `<a>` tag
- Check `href` paths match file structure
- Verify Navigation is imported in layout

### Issue: Client Component not interactive

**Solution:**
- Check `"use client"` directive is at top of file
- Verify hooks are imported from 'react'
- Check component is not nested incorrectly

### Issue: TypeScript errors in components

**Solution:**
- Ensure props interfaces are defined
- Check import paths use `@/` alias correctly
- Verify TypeScript is configured in `tsconfig.json`

## Next Steps

After completing these exercises:

1. ✅ **Review**: Understand Server vs Client Components
2. ✅ **Experiment**: Create more pages and components
3. ✅ **Practice**: Add more interactive features
4. 📖 **Continue**: Move to [Level 2: Styling and Layout](../level-02-styling-and-layout/lesson-01-tailwind-css.md)
5. 💻 **Reference**: Check `project/` folder for complete implementation

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)

---

**Key Takeaways:**
- Pages are created in `app/` directory using file-based routing
- Server Components are default (no JavaScript sent to client)
- Client Components need `"use client"` for interactivity
- Use `Link` component for client-side navigation
- TypeScript interfaces ensure type-safe props
- Layout wraps all pages automatically

**Good luck! Happy coding! 🚀**
