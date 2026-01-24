# Exercises 02: Styling and Layout

## Learning Objectives

By completing these exercises, you will:
- ✅ Style components with Tailwind CSS
- ✅ Create layouts using Flexbox
- ✅ Implement Grid layouts
- ✅ Build responsive designs
- ✅ Understand Tailwind utility classes
- ✅ Practice mobile-first design

## Before You Start

**Prerequisites:**
- Next.js project set up
- Tailwind CSS configured
- Understanding of CSS basics
- Completed Level 1 exercises

**Setup:**
1. Navigate to `fs-course-frontend/level-02-styling-and-layout/`
2. Ensure Tailwind is configured in your project
3. All exercises should be created in `project/src/`

---

## Exercise 1: Tailwind Styling

**Objective:** Style a button component with Tailwind CSS utility classes.

**Instructions:**
Create `project/src/components/StyledButton.tsx` that styles a button with:
1. Blue background
2. White text
3. Padding and rounded corners
4. Hover effect

**Expected Code Structure:**
```typescript
// project/src/components/StyledButton.tsx
interface StyledButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function StyledButton({ 
  label, 
  onClick, 
  variant = 'primary' 
}: StyledButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition duration-200";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {label}
    </button>
  );
}
```

**Usage Example:**
```typescript
// In a page component
import StyledButton from '@/components/StyledButton';

export default function Page() {
  return (
    <div className="p-8">
      <StyledButton 
        label="Click Me" 
        onClick={() => alert('Clicked!')} 
      />
    </div>
  );
}
```

**Verification Steps:**
1. Add component to a page
2. Check button styling in browser
3. Test hover effect
4. Verify active state works

**Expected Appearance:**
- Blue background with white text
- Rounded corners
- Smooth hover transition
- Proper padding

**Hints:**
- Use Tailwind utility classes
- Combine classes with template literals
- Use hover: prefix for hover states
- transition for smooth animations

**Common Mistakes:**
- ❌ Not using Tailwind classes
- ❌ Wrong class names
- ❌ Forgetting hover: prefix
- ❌ Not using transition

**File:** `project/src/components/StyledButton.tsx`

---

## Exercise 2: Flexbox Layout

**Objective:** Create a navigation bar using Flexbox.

**Instructions:**
Create `project/src/components/NavBar.tsx` that:
1. Uses horizontal flex layout
2. Spaces items between start and end
3. Centers items vertically
4. Includes navigation links

**Expected Code Structure:**
```typescript
// project/src/components/NavBar.tsx
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              MyApp
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

**Key Flexbox Classes:**
- `flex` - Creates flex container
- `items-center` - Vertically centers items
- `justify-between` - Spaces items apart
- `space-x-8` - Horizontal spacing between children

**Verification Steps:**
1. Add NavBar to layout
2. Check horizontal layout
3. Verify spacing works
4. Test navigation links

**Expected Behavior:**
- Logo on left, links on right
- Vertically centered
- Proper spacing
- Responsive (can add mobile menu later)

**Hints:**
- `flex` makes container flexible
- `justify-*` controls horizontal alignment
- `items-*` controls vertical alignment
- `space-x-*` adds horizontal spacing

**Common Mistakes:**
- ❌ Not using flex container
- ❌ Wrong justify/items classes
- ❌ Not understanding flex direction

**File:** `project/src/components/NavBar.tsx`

---

## Exercise 3: Grid Layout

**Objective:** Create a responsive card grid.

**Instructions:**
Create `project/src/components/CardGrid.tsx` that displays cards in:
1. 3 columns on desktop
2. 2 columns on tablet
3. 1 column on mobile

**Expected Code Structure:**
```typescript
// project/src/components/CardGrid.tsx
interface Card {
  id: number;
  title: string;
  description: string;
}

interface CardGridProps {
  cards: Card[];
}

export default function CardGrid({ cards }: CardGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {card.title}
          </h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
```

**Usage:**
```typescript
const cards = [
  { id: 1, title: "Card 1", description: "Description 1" },
  { id: 2, title: "Card 2", description: "Description 2" },
  { id: 3, title: "Card 3", description: "Description 3" },
];

<CardGrid cards={cards} />
```

**Responsive Breakpoints:**
- `grid-cols-1` - Mobile (default)
- `md:grid-cols-2` - Tablet (768px+)
- `lg:grid-cols-3` - Desktop (1024px+)

**Verification Steps:**
1. View on mobile - 1 column
2. View on tablet - 2 columns
3. View on desktop - 3 columns
4. Check gap spacing

**Expected Behavior:**
- Responsive grid layout
- Cards stack properly
- Gap between cards
- Hover effects work

**Hints:**
- Use `grid` for grid layout
- `grid-cols-*` sets column count
- Breakpoint prefixes: `md:`, `lg:`
- `gap-*` adds spacing

**Common Mistakes:**
- ❌ Wrong breakpoint prefixes
- ❌ Not using grid classes
- ❌ Wrong column counts

**File:** `project/src/components/CardGrid.tsx`

---

## Exercise 4: Responsive Design

**Objective:** Create a fully responsive page layout.

**Instructions:**
Create `project/src/app/responsive/page.tsx` that:
1. Mobile: single column layout
2. Tablet: 2 column layout
3. Desktop: 3 column layout
4. Includes header, content, and sidebar

**Expected Code Structure:**
```typescript
// project/src/app/responsive/page.tsx
export default function ResponsivePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Responsive Layout
        </h1>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sidebar - Full width on mobile, 1 column on larger */}
          <aside className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
            <p className="text-gray-600">
              This sidebar appears on all screen sizes but takes different space.
            </p>
          </aside>

          {/* Main Content - Full width on mobile/tablet, 2 columns on desktop */}
          <div className="md:col-span-2 lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Main Content</h2>
              <p className="text-gray-600">
                This is the main content area. On mobile, it's full width.
                On tablet, it shares space with sidebar. On desktop, it takes
                2/3 of the width.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Content</h2>
              <p className="text-gray-600">
                More content goes here. The layout adapts to screen size.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Responsive Behavior:**
- **Mobile (< 768px)**: Single column, sidebar and content stack
- **Tablet (768px - 1024px)**: 2 columns, sidebar and content side-by-side
- **Desktop (> 1024px)**: 3 columns, sidebar 1/3, content 2/3

**Verification Steps:**
1. Test on mobile viewport
2. Test on tablet viewport
3. Test on desktop viewport
4. Verify layout adapts correctly

**Expected Behavior:**
- Layout changes at breakpoints
- Content readable on all sizes
- No horizontal scrolling
- Proper spacing

**Hints:**
- Mobile-first approach (base styles for mobile)
- Add breakpoints for larger screens
- Use `col-span-*` for spanning columns
- Test with browser dev tools

**Common Mistakes:**
- ❌ Desktop-first instead of mobile-first
- ❌ Wrong breakpoint values
- ❌ Not testing all screen sizes
- ❌ Content overflow issues

**File:** `project/src/app/responsive/page.tsx`

---

## Running Exercises

### Start Development Server

```bash
cd project
pnpm dev
```

### Test Responsive Design

1. Open browser dev tools (F12)
2. Use device toolbar (Ctrl+Shift+M)
3. Test different screen sizes
4. Verify layout adapts

## Verification Checklist

After completing all exercises, verify:

- [ ] Button styles correctly with Tailwind
- [ ] Navigation bar uses Flexbox properly
- [ ] Grid layout is responsive
- [ ] Responsive page adapts to screen sizes
- [ ] Hover effects work
- [ ] No layout issues on different screens
- [ ] All components are type-safe

## Troubleshooting

### Issue: Tailwind classes not working

**Solution:**
- Check `tailwind.config.ts` exists
- Verify `globals.css` imports Tailwind
- Restart dev server
- Check for typos in class names

### Issue: Layout not responsive

**Solution:**
- Verify breakpoint prefixes (`md:`, `lg:`)
- Check viewport meta tag in layout
- Test with browser dev tools
- Ensure mobile-first approach

### Issue: Flexbox not working

**Solution:**
- Check parent has `flex` class
- Verify `justify-*` and `items-*` classes
- Check for conflicting styles

## Next Steps

1. ✅ **Review**: Understand Tailwind and layouts
2. ✅ **Experiment**: Create more complex layouts
3. 📖 **Continue**: Move to [Level 3: State and Data Fetching](../level-03-state-and-data-fetching/lesson-01-react-hooks.md)
4. 💻 **Reference**: Check `project/` folder

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Key Takeaways:**
- Tailwind provides utility classes for styling
- Flexbox is great for 1D layouts
- Grid is perfect for 2D layouts
- Mobile-first design is best practice
- Breakpoints adapt layout to screen size
- Always test on multiple screen sizes

**Good luck! Happy coding! 🚀**
