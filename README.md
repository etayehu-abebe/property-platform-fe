# Property Platform Frontend

This is a modern web application built with **Next.js** for browsing, listing, and managing properties.  
It connects to a REST API backend to handle authentication, property data, and user interactions.

## Tech Stack

This project uses the following technologies:

### Framework
- ## Next.js (App Router) ## 
  Chosen for its hybrid rendering (SSR, SSG), file-based routing, and excellent performance. It provides a strong foundation for scalable React applications.

### Language
- ## TypeScript ##  
  Used to ensure type safety across components, API calls, and state management, improving reliability and maintainability.

### Styling
- ## Tailwind CSS ##  
  Chosen for its utility-first approach, rapid UI development, and consistent design system.

### State Management
- ## Zustand ##  
  Lightweight and simple global state management used for authentication and user state without unnecessary boilerplate.

  ### Server State & Data Fetching
- ## TanStack Query (React Query) ##  
  Used for fetching, caching, synchronizing, and updating server state.  
  It simplifies API interactions by handling loading states, caching, retries, background refetching, and optimistic updates.


### Forms & Validation
- ## React Hook Form ##  
  Efficient form handling with minimal re-renders.
- ## Zod ##  
  Used for schema-based form validation and type inference.

### Data Fetching
- ## Fetch API ##  
  Used for communicating with the backend REST API.
- ## Server & Client Components ##  
  Next.js App Router is used to optimize data fetching and rendering strategies.

### UI & UX
- ## next/image ##
  Optimized image loading for better performance.
- ## Lucide Icons ##  
  Clean and modern icon set.

### Configuration & Utilities
- ## Environment Variables ##  
  Used for managing API URLs and deployment-specific settings.

---

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
