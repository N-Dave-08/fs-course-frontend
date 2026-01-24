# Lesson 2: Layouts

## Flexbox Layout

```typescript
<div className="flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>
```

## Grid Layout

```typescript
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Container and Max Width

```typescript
<div className="container mx-auto px-4">
  Content with max width
</div>
```

## Next.js Layouts

Use `layout.tsx` for shared layouts:

```typescript
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
```
