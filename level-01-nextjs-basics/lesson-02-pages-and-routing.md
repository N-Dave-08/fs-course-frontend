# Lesson 2: Pages and Routing

## File-Based Routing

In the App Router, the file structure determines routes:

```
app/
├── page.tsx          → / (home page)
├── about/
│   └── page.tsx      → /about
├── blog/
│   └── page.tsx      → /blog
└── contact/
    └── page.tsx      → /contact
```

## Creating Pages

Each `page.tsx` file exports a default component:

```typescript
// app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
    </div>
  );
}
```

## Dynamic Routes

Use `[param]` for dynamic segments:

```
app/
└── blog/
    └── [slug]/
        └── page.tsx  → /blog/[slug]
```

```typescript
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <h1>Blog Post: {params.slug}</h1>;
}
```

## Navigation

Use Next.js `Link` component for client-side navigation:

```typescript
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
```

## Layouts

Use `layout.tsx` for shared layouts:

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```
