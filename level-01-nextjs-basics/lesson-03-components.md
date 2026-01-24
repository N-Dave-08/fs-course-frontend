# Lesson 3: Components

## Server Components (Default)

Server Components run on the server:

```typescript
// app/components/ServerComponent.tsx
export default function ServerComponent() {
  // This runs on the server
  const data = fetchDataFromDatabase();
  
  return <div>{data}</div>;
}
```

**Benefits:**
- No JavaScript sent to client
- Can access databases and APIs directly
- Better performance

## Client Components

Use `"use client"` for interactivity:

```typescript
// app/components/ClientComponent.tsx
"use client";

import { useState } from 'react';

export default function ClientComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## Component Composition

Combine Server and Client Components:

```typescript
// Server Component
export default function Page() {
  return (
    <div>
      <ServerComponent />
      <ClientComponent />
    </div>
  );
}
```

## Props and TypeScript

Type your component props:

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button({ label, onClick, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

## Component Organization

Organize components in `components/` directory:

```
src/
└── components/
    ├── ui/
    │   ├── Button.tsx
    │   └── Card.tsx
    └── layout/
        ├── Header.tsx
        └── Footer.tsx
```
