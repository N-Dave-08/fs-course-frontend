# Exercises 06: Advanced Patterns

## Learning Objectives

By completing these exercises, you will:
- ✅ Optimize images with Next.js Image
- ✅ Implement code splitting
- ✅ Monitor performance
- ✅ Write a basic frontend test (and understand where the full testing track lives)
- ✅ Improve Core Web Vitals
- ✅ Reduce bundle size
- ✅ Practice optimization techniques

## Before You Start

**Prerequisites:**
- Next.js advanced knowledge
- Understanding of performance
- Image optimization concepts

**Setup:**
1. Navigate to `fs-course-frontend/level-06-advanced-patterns/`
2. All exercises should be created in `project/src/`

---

## Exercise 1: Image Optimization

**Objective:** Optimize images using Next.js Image component.

**Instructions:**
Create `project/src/app/gallery/page.tsx` that:
1. Uses Next.js Image component
2. Adds proper alt text
3. Sets appropriate sizes

**Expected Code Structure:**
```typescript
// project/src/app/gallery/page.tsx
import Image from 'next/image';

const images = [
  { src: '/images/photo1.jpg', alt: 'Beautiful landscape' },
  { src: '/images/photo2.jpg', alt: 'City skyline' },
  { src: '/images/photo3.jpg', alt: 'Mountain view' },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gallery</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 3} // Prioritize first 3 images
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Verification:**
- Images optimized
- Proper alt text
- Responsive sizes
- Fast loading

**File:** `project/src/app/gallery/page.tsx`

---

## Exercise 2: Code Splitting

**Objective:** Implement code splitting with dynamic imports.

**Instructions:**
Create `project/src/components/LazyComponent.tsx`:
1. Uses dynamic imports
2. Adds loading states
3. Reduces initial bundle

**Expected Code Structure:**
```typescript
// project/src/components/LazyComponent.tsx
import dynamic from 'next/dynamic';

// Dynamically import heavy component
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Disable SSR if needed
});

export default function LazyComponent() {
  return (
    <div>
      <h2>Lazy Loaded Component</h2>
      <HeavyComponent />
    </div>
  );
}
```

**Verification:**
- Code split works
- Loading state shows
- Bundle size reduced

**File:** `project/src/components/LazyComponent.tsx`

---

## Exercise 3: Performance Monitoring

**Objective:** Add performance monitoring.

**Instructions:**
Create `project/src/app/performance/page.tsx`:
1. Measures page load times
2. Tracks Core Web Vitals
3. Identifies bottlenecks

**Expected Code Structure:**
```typescript
// project/src/app/performance/page.tsx
"use client";

import { useEffect } from 'react';

export default function PerformancePage() {
  useEffect(() => {
    // Measure page load
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime, 'ms');
      });
    }

    // Web Vitals (if using web-vitals library)
    // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Performance Monitoring</h1>
      <p>Check browser console for performance metrics</p>
    </div>
  );
}
```

**Verification:**
- Metrics logged
- Performance tracked
- Bottlenecks identified

**File:** `project/src/app/performance/page.tsx`

---

## Exercise 4: Testing (Quick Alignment with Lesson 03)

**Objective:** Write one small test so this level’s exercises align with the “Testing” lesson.

> For the full testing setup (Jest/RTL/Playwright configuration), follow `fs-course-testing`. This exercise is intentionally minimal.

### Option A (recommended): Add a small component test (React Testing Library)

Create `project/src/components/Button.tsx` (or reuse an existing button) and write a test at:
- `project/src/components/__tests__/Button.test.tsx`

**Expected test shape (conceptual):**

```typescript
import { render, screen } from "@testing-library/react";
import Button from "../Button";

test("renders the button label", () => {
  render(<Button label="Save" onClick={() => {}} />);
  expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
});
```

### Option B: Add a tiny E2E test (Playwright)

Create an E2E test file at:
- `project/src/e2e/navigation.spec.ts`

**Expected test shape (conceptual):**

```typescript
import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading")).toBeVisible();
});
```

**Verification:**
- Your test uses **roles** (not brittle CSS selectors)
- The test asserts **user-visible behavior**
- You know where to go next for full coverage: `fs-course-testing/`

## Running Exercises

### Test Performance

```bash
cd project
pnpm dev
# Open browser dev tools
# Check Network and Performance tabs
```

## Verification Checklist

- [X] Images optimized
- [X] Code splitting works
- [X] Performance monitored
- [X] At least one test written (RTL or Playwright)
- [X] Bundle size reduced
- [X] Core Web Vitals improved

## Next Steps

1. ✅ **Review**: Understand optimization
2. ✅ **Experiment**: Add more optimizations
3. 📖 **Complete**: Review all frontend levels
4. 💻 **Reference**: Check `project/` folder

---

**Key Takeaways:**
- Next.js Image optimizes automatically
- Code splitting reduces bundle size
- Monitor performance regularly
- Optimize for Core Web Vitals
- Use dynamic imports for heavy components
- Always add alt text to images

**Good luck! Happy coding! 🚀**
