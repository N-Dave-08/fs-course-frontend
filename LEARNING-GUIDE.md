# Frontend Course Setup Guide

Complete setup instructions for the Next.js frontend development course.

## Central Course Docs (Meta Repo)

Replace `N-Dave-08` (already applied below):

- **Version Matrix**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/VERSION-MATRIX.md`
- **Learning Flow**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/LEARNING-FLOW.md`
- **Course Index**: `https://github.com/N-Dave-08/fs-course-meta/blob/main/COURSE-INDEX.md`

## Prerequisites

Before starting, ensure you have:

1. **Node.js 22+ LTS** installed
   - Check: `node --version`
   - Download: [nodejs.org](https://nodejs.org/)

2. **pnpm** package manager installed
   - Check: `pnpm --version`
   - Install: `npm install -g pnpm` or `corepack enable`

3. **TypeScript Knowledge**
   - Complete [fs-course-typescript](../fs-course-typescript/) first
   - This course requires TypeScript fundamentals

4. **Code Editor** (VS Code recommended)
   - Download: [code.visualstudio.com](https://code.visualstudio.com/)
   - Install extensions: ESLint, Prettier, Tailwind CSS IntelliSense

## Initial Setup

### Step 1: Navigate to Course Directory

```bash
cd fs-course-frontend
```

### Step 2: Scaffold Next.js Project

Create the `project/` folder using Next.js scaffolding tool:

```bash
npx create-next-app@latest project --typescript --tailwind --app --import-alias "@/*" --use-pnpm
```

**What this does:**
- Creates a new **Next.js project using the latest stable version available at install time**
- Sets up **TypeScript** (version determined by the scaffolder/toolchain)
- Configures **Tailwind CSS** (if selected)
- Uses the **App Router**
- Sets up import alias `@/*` for cleaner imports
- Uses pnpm as package manager

If you want the course-wide recommended versions, see:
- `https://github.com/N-Dave-08/fs-course-meta/blob/main/VERSION-MATRIX.md`

**During setup, you'll be prompted:**
- Would you like to use ESLint? → **Yes**
- Would you like to use Tailwind CSS? → **Yes** (already selected)
- Would you like to use `src/` directory? → **Yes** (recommended)
- Would you like to use App Router? → **Yes** (already selected)
- Would you like to customize the default import alias? → **No** (use @/*)

### Step 3: Install Dependencies

```bash
cd project
pnpm install
```

This installs all dependencies specified in `package.json`.

### Step 4: Verify Installation

Check that everything is set up correctly:

```bash
# Check Next.js version
npx next --version

# Check TypeScript version
npx tsc --version

# Cross-platform: print dependency versions from package.json (Node required)
node -p "require('./package.json').dependencies.next"
node -p "require('./package.json').dependencies.react"
node -p "require('./package.json').devDependencies.typescript"
```

### Step 5: Run Development Server

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the Next.js welcome page.

## Project Structure

After scaffolding, your `project/` folder will have:

```
project/
├── src/
│   ├── app/              # App Router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css  # Global styles
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── next.config.js       # Next.js config
└── tailwind.config.ts   # Tailwind config
```

## Where to write exercise code

- Your actual app lives in `project/`.
- Unless an exercise explicitly says otherwise, create files under:
  - `project/src/app/...`
  - `project/src/components/...`
  - `project/src/lib/...`
- Keep lesson notes and scratch experiments in `project/src/` as well, so everything compiles together.

## Environment Variables

Create a `.env.local` file in the `project/` directory:

```bash
cd project
cp ../.env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Backend API URL (from fs-course-backend)
NEXT_PUBLIC_API_URL=http://localhost:3001

# Authentication (if using)
NEXT_PUBLIC_AUTH_SECRET=your-secret-key
```

## Workflow

### Running the Development Server

```bash
cd project
pnpm dev
```

### Building for Production

```bash
cd project
pnpm build
pnpm start
```

### Running Type Checks

```bash
cd project
pnpm type-check
# Or: npx tsc --noEmit
```

### Linting

```bash
cd project
pnpm lint
```

## Working with Lessons

1. **Read the lesson** - Understand concepts and examples
2. **Try examples** - Create test files in `project/src/` to experiment
3. **Complete exercises** - Follow exercise instructions
4. **Study project** - Reference the complete implementation in `project/`

## Troubleshooting

### Issue: "Command not found: pnpm"

**Solution:**
```bash
npm install -g pnpm
# Or enable corepack
corepack enable
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Issue: TypeScript errors

**Solution:**
- Ensure you completed fs-course-typescript
- Check `tsconfig.json` exists
- Run `pnpm install` to ensure all types are installed

### Issue: Tailwind CSS not working

**Solution:**
- Check `tailwind.config.ts` exists
- Ensure `globals.css` imports Tailwind directives
- Restart the dev server

### Issue: Module not found errors

**Solution:**
- Run `pnpm install` in the `project/` directory
- Check import paths use `@/` alias correctly
- Verify file extensions (.tsx for React components)

## Next Steps

Once your environment is set up:

1. ✅ Verify setup by running `pnpm dev` and visiting localhost:3000
2. 📖 Start with [Level 1: Next.js Basics](./level-01-nextjs-basics/lesson-01-introduction.md)
3. 💻 Complete exercises for each level
4. 📚 Explore the [project/](./project/) folder for reference
5. 🔗 Check [Resources](./resources/) for quick reference

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

Happy coding! 🚀
