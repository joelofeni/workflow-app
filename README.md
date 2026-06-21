# Workflow App v1

A modern workflow management application built with Next.js and TypeScript.

## Overview

Workflow App is a portfolio project focused on frontend architecture, state management, drag-and-drop interactions, local persistence, responsive design, and reusable UI systems.

The project demonstrates how to build a complete client-side application without relying on a backend or database.

## Features

- Create, edit, and delete tasks
- Drag and drop task management
- Global task search
- LocalStorage persistence
- Dark and light themes
- Responsive layout
- Mobile navigation drawer
- Settings page

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes
- @hello-pangea/dnd

## Architecture

- App Router
- Context + Reducer state management
- Design token system
- LocalStorage persistence
- Component-driven architecture
- Responsive UI design

## Routes

| Route      | Description                  |
| ---------- | ---------------------------- |
| /          | Main workflow board          |
| /settings  | Application settings         |
| /task/[id] | Reserved for future versions |

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## Version

Current release:

v1.0.0

## License

Portfolio project.
