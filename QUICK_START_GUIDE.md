# Quick Start Guide: Managing Programs

This project now uses local JSON files as the source of truth for page content.

## Program Content Location

Programs are defined in:

- `content/program-pages/*.json`

Each file becomes one route at:

- `/programs/{slug}`

## Add a New Program

1. Create a new JSON file in `content/program-pages/`.
2. Set a unique `slug` (or use a filename that matches your desired slug).
3. Set `title`, `showInNavbar`, and `order`.
4. Fill the content sections (`programHeader`, `learningPathway`, `videoSection`, etc.).
5. Run `npm run dev` and open `/programs/{slug}`.

## Example Program File

```json
{
  "title": "My New Program",
  "slug": "my-new-program",
  "showInNavbar": true,
  "order": 8,
  "programHeader": {
    "title": "My New Program",
    "description": "Program overview.",
    "programs": [{ "name": "Track A" }],
    "stats": [{ "value": "500+", "label": "Learners" }],
    "images": [{ "src": "/skillup.jpg", "alt": "Program image" }]
  },
  "learningPathway": {
    "phases": [],
    "objectives": [],
    "outcomes": []
  },
  "videoSection": {
    "title": "Watch Highlights",
    "subtitle": "Program in action"
  },
  "partners": { "title": "Our Partners" },
  "testimonials": { "title": "Success Stories" },
  "gallery": { "title": "Gallery", "subtitle": "Snapshots" },
  "ctaBanner": {
    "title": "Apply Now",
    "description": "Join the next cohort",
    "buttonText": "Get Started"
  }
}
```

## Navbar Behavior

Program links in the navbar are generated from `content/program-pages/*.json`.

- `showInNavbar: true` includes the program
- `order` controls sort position

## Blog Content

Blog list page:

- `content/blog/blog.json`

Blog detail pages:

- `content/blog-posts/*.json`
- Route: `/blogdetails/{slug}`

## Build and Test

```bash
npm run build
npm test
```

## Deploy Notes

After editing content files:

1. Commit changes
2. Push to your branch
3. Deploy

No external content service is required.
