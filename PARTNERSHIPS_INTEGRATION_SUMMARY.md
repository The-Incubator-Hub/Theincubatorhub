# Partnerships Page Integration Summary

The partnerships page is fully driven by local JSON content.

## Source File

- `content/partnerships/partnerships.json`

## Page Route

- `src/app/partnerships/page.js`
- URL: `/partnerships`

## Rendering

- Server page loader reads JSON from `content/`
- Client component renders sections from `initialData`
- No external content service dependency

## Editable Sections (via JSON)

- Hero section
- Benefits section
- Partners list
- Team intro
- CTA/banner blocks (if present in schema)

## Update Workflow

1. Edit `content/partnerships/partnerships.json`
2. Save and run dev server (or build)
3. Verify `/partnerships`
4. Commit and deploy

## Verification

```bash
npm run build
npm test
```

If both pass, the partnerships page integration is healthy.
