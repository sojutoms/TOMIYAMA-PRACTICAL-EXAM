# Guitar Store Inventory Manager

A single-page React (Vite) app for registering and managing guitar store inventory.

## Features

- **Register Item** — form with real-time validation for Guitar Model, Sub-category/Genre, Brand/Artist, Stock Quantity (1-100), Label/Company Name, and User Role.
- **Registry Table** — TanStack Table with pagination (5 rows/page), sub-category filtering, and row selection.
- **Active Item Profile** — detail card that syncs with the selected table row and shows a User Role badge.

Styling is done with CSS Modules. Data is kept in React state and persisted to `localStorage` — the registry starts empty and is populated only by items you register through the form.

## Getting started

```bash
npm install
npm run dev
```

## Deployment

This project deploys to [Vercel](https://vercel.com) with zero extra configuration:

1. Import this repository into Vercel.
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build` · Output directory: `dist`.
