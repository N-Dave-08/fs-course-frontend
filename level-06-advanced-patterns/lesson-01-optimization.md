# Lesson 1: Optimization

## Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority // For above-the-fold images
/>
```

## Code Splitting

Automatic with App Router:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## Memoization

```typescript
import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering
});
```
