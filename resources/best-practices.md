# Next.js Best Practices

## Use Server Components by Default

Prefer Server Components for better performance:

```typescript
// Good: Server Component
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Only use Client Component when needed
'use client';
export default function Interactive() {
  const [state, setState] = useState();
  return <div>...</div>;
}
```

## Optimize Images

Always use Next.js Image component:

```typescript
import Image from 'next/image';

<Image src="/image.jpg" alt="Description" width={500} height={300} />
```

## Organize Components

```
src/
├── app/           # Pages and routes
├── components/    # Reusable components
│   ├── ui/       # UI components
│   └── layout/   # Layout components
├── lib/          # Utilities
└── types/        # TypeScript types
```

## Environment Variables

Use `NEXT_PUBLIC_` prefix for client-side variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Type Safety

Always type your components and functions:

```typescript
interface Props {
  title: string;
  count?: number;
}

export default function Component({ title, count }: Props) {
  return <div>{title}</div>;
}
```
