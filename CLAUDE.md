# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Run production build:
```bash
npm run start
```

Lint the codebase:
```bash
npm run lint
```

## Architecture

This is a Next.js 15.3.2 TODO application using the App Router architecture. The project structure follows Next.js conventions:

- `app/` - Contains the main application code using App Router
  - `layout.tsx` - Root layout with Japanese language setting and Geist fonts
  - `page.tsx` - Main TODO application page (client component)
  - `globals.css` - Global styles with Tailwind CSS v4 and dark mode support

### Key Application Features

The main TODO application (`app/page.tsx`) is a single-page client component that implements:
- TODO CRUD operations (create, read, update, delete)
- Inline editing functionality
- Filter system (all/active/completed todos)
- Statistics display (total, active, completed counts)
- Local state management using React hooks

### Technology Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Icons**: Lucide React
- **Fonts**: Geist Sans and Geist Mono from Google Fonts

### State Management

The application uses React's built-in state management:
- `useState` for todos array, input fields, and filter state
- Local component state only (no external state management library)

### Styling Approach

- Tailwind CSS v4 with inline theme configuration
- Responsive design with mobile-first approach
- Dark mode support via CSS custom properties
- Component-level styling with Tailwind classes