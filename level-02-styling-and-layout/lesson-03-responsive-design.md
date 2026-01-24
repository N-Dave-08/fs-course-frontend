# Lesson 3: Responsive Design

## Breakpoints

Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Responsive Classes

```typescript
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## Mobile-First

Design for mobile first, then add larger breakpoints:

```typescript
<div className="flex flex-col md:flex-row">
  Mobile: column, Desktop: row
</div>
```

## Responsive Images

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  className="w-full h-auto"
/>
```
