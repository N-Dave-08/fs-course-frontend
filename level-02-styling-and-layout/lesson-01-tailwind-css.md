# Lesson 1: Tailwind CSS

## What is Tailwind CSS?

Tailwind is a utility-first CSS framework that provides low-level utility classes.

## Using Tailwind Classes

```typescript
export default function Button() {
  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded">
      Click me
    </button>
  );
}
```

## Common Utilities

- **Colors**: `bg-blue-500`, `text-red-600`
- **Spacing**: `p-4`, `m-2`, `px-6`, `py-3`
- **Typography**: `text-xl`, `font-bold`, `text-center`
- **Layout**: `flex`, `grid`, `hidden`, `block`
- **Responsive**: `md:text-lg`, `lg:flex`

## Customization

Configure Tailwind in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
    },
  },
}
```
