# WhatsApp Chat Clone

## Overview
A WhatsApp-style chat interface application built with React, TypeScript, Vite, and Tailwind CSS. This is a frontend-only application imported from Lovable.

## Project Structure
- `src/` - Source code
  - `App.tsx` - Main app component with routing
  - `pages/` - Page components (Index, NotFound)
  - `components/` - Reusable UI components
    - `ChatHeader.tsx` - Chat header with contact info
    - `MessageBubble.tsx` - Chat message bubbles
    - `WhatsAppChat.tsx` - Main chat component
    - `TypingIndicator.tsx` - Typing animation
    - `ui/` - shadcn/ui components
  - `index.css` - Global styles and Tailwind configuration

## Tech Stack
- React 18
- TypeScript
- Vite (dev server on port 5000)
- Tailwind CSS
- shadcn/ui components
- React Router for navigation
- TanStack Query for data fetching

## Running the App
The application runs on port 5000 via the `npm run dev` command.

## Recent Changes
- January 21, 2026: Imported from Lovable to Replit
  - Updated Vite config to use port 5000 and allow all hosts
  - Fixed CSS import order (moved @import before @tailwind directives)
