# Programs Integration Summary

The programs system is now fully file-based and dynamic.

## What Is Implemented

1. Dynamic route for program pages:
- `src/app/programs/[slug]/page.js`

2. Source of truth:
- `content/program-pages/*.json`

3. Navbar program menu:
- Built from local program files at runtime in `src/app/layout.js`
- Sorted by `order`
- Filtered by `showInNavbar`

4. SEO for each program page:
- Page metadata generated per slug
- Structured data (`Course`) generated per slug

## Program File Requirements

Each program JSON should include:

- `title`
- `slug`
- `showInNavbar`
- `order`
- Content sections used by the UI components

## Routing

- Program details: `/programs/{slug}`
- `/programs` currently redirects to `/`

## Operational Flow

1. Add or update `content/program-pages/{name}.json`
2. Build runs static generation for all program slugs
3. Program appears in navbar if `showInNavbar` is `true`
4. Page renders from local JSON data

## Validation

Use:

```bash
npm run build
npm test
```

This confirms routes, static params, and page rendering are valid.
