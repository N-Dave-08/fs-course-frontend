# Lesson 3: Testing

## Unit Testing

Test components with React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## E2E Testing

Use Playwright for end-to-end tests:

```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Next.js/);
});
```

## Testing Setup

See [fs-course-testing](../fs-course-testing/) for comprehensive testing guide.
