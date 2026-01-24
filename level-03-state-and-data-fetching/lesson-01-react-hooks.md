# Lesson 1: React Hooks

## useState

Manage component state:

```typescript
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## useEffect

Handle side effects:

```typescript
"use client";

import { useEffect, useState } from 'react';

export default function Component() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData().then(setData);
  }, []);
  
  return <div>{data}</div>;
}
```

## Custom Hooks

Create reusable logic:

```typescript
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(count + 1);
  return { count, increment };
}
```
