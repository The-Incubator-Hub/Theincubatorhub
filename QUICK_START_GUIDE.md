# Quick Start Guide: Managing Programs via Tina CMS

## ✅ What's Been Set Up

Your application now has a fully functional **dynamic program management system** powered by Tina CMS. All programs automatically appear in the navbar and have dedicated pages.

## 🎯 Current Programs (7 Total)

All programs are live and accessible through individual pages:

| Order | Program Name | Slug | URL |
|-------|-------------|------|-----|
| 1 | Digital SkillUp Africa | `digital-skillup-africa` | `/programs/digital-skillup-africa` |
| 2 | Future Clan Bootcamp | `future-clan-bootcamp` | `/programs/future-clan-bootcamp` |
| 3 | Ladies in Tech Africa | `ladies-in-tech-africa` | `/programs/ladies-in-tech-africa` |
| 4 | Skill Up | `skill-up` | `/programs/skill-up` |
| 5 | Future Now | `future-now` | `/programs/future-now` |
| 6 | AI Now | `ai-now` | `/programs/ai-now` |
| 7 | Vista Africa | `vista-africa` | `/programs/vista-africa` |

**Note:** The `/programs` route redirects to the home page. Programs are accessed via the navbar dropdown or directly through their URLs.

## 🚀 How to Add a New Program

### Method 1: Using Tina CMS Admin (Recommended)

1. **Start the development server** (if not running):
   ```bash
   npm run dev
   ```

2. **Access Tina CMS Admin Panel:**
   - Navigate to: `http://localhost:3000/admin`
   - Login if required

3. **Create New Program:**
   - Click on **"Individual Programs"** in the left sidebar
   - Click **"Create New"** button
   - Fill in the required fields:

#### Required Fields:
- **Program Title**: Display name (e.g., "Web3 Bootcamp")
- **URL Slug**: URL identifier (e.g., "web3-bootcamp")
  - Must be unique
  - Use lowercase with hyphens
  - Will become: `/programs/web3-bootcamp`

#### Navbar Settings:
- **Show in Navbar**: Toggle ON (default)
- **Display Order**: Number (e.g., 8 for next in line)
  - Lower numbers appear first
  - Current range: 1-7

#### Content Sections:
- **Program Header**: Title, description, stats, images
- **Learning Pathway**: Phases, objectives, outcomes
- **Video Section**: Title, subtitle, video URL
- **Partners**: Partner logos and information
- **Gallery**: Program photos
- **Testimonials**: Student success stories
- **CTA Banner**: Call-to-action section

4. **Save:**
   - Click **"Save"** button
   - The program immediately appears in the navbar!
   - Page is accessible at `/programs/{your-slug}`

### Method 2: Create JSON File Manually

Create a file: `content/program-pages/your-program-slug.json`

```json
{
  "title": "Your Program Name",
  "slug": "your-program-slug",
  "showInNavbar": true,
  "order": 8,
  "programHeader": {
    "title": "Your Program Name",
    "description": "Brief program description here",
    "programs": [
      { "name": "Track 1" },
      { "name": "Track 2" }
    ],
    "stats": [
      { "value": "100+", "label": "Students" },
      { "value": "95%", "label": "Success Rate" }
    ],
    "images": [
      {
        "src": "/images/your-image.jpg",
        "alt": "Program image description"
      }
    ]
  },
  "learningPathway": {
    "phases": [
      {
        "title": "Foundation Phase",
        "description": "Learn the basics",
        "icon": "Lightbulb",
        "color": "orange"
      }
    ],
    "objectives": [
      { "text": "Objective 1" },
      { "text": "Objective 2" }
    ],
    "outcomes": [
      { "icon": "Briefcase", "text": "Job-ready skills" },
      { "icon": "Rocket", "text": "Launch your career" }
    ]
  },
  "videoSection": {
    "title": "See It in Action",
    "subtitle": "Watch program highlights"
  },
  "partners": {
    "title": "Our Partners"
  },
  "testimonials": {
    "title": "Success Stories"
  },
  "gallery": {
    "title": "Program Gallery",
    "subtitle": "Program highlights"
  },
  "ctaBanner": {
    "title": "Ready to Join?",
    "description": "Start your journey today",
    "buttonText": "Apply Now"
  }
}
```

## 📝 How to Edit Existing Programs

### Using Tina CMS:
1. Go to `http://localhost:3000/admin`
2. Click "Individual Programs"
3. Select the program to edit
4. Make changes
5. Click "Save"

### Manually:
1. Open the program file in `content/program-pages/{slug}.json`
2. Edit the JSON
3. Save the file
4. Changes appear immediately (dev server auto-reloads)

## 🎛️ Program Settings

### Control Navbar Visibility:
```json
"showInNavbar": true  // Shows in navbar
"showInNavbar": false // Hides from navbar (page still accessible via direct URL)
```

### Change Display Order:
```json
"order": 1  // Appears first
"order": 8  // Appears after programs 1-7
```

Programs are sorted by `order` (ascending). Same order numbers use alphabetical sorting.

### Update Program URL:
```json
"slug": "new-program-name"
```
⚠️ **Important**: If you change the slug, update any links pointing to the old URL.

## 🔍 Verification Steps

### 1. Check Navbar:
- **Desktop**: Click "Our Programs" dropdown
- **Mobile**: Tap menu → "Our Programs"
- Your program should appear in the list

### 2. Test Program Page:
- Navigate to: `http://localhost:3000/programs/{your-slug}`
- Verify all sections display correctly

### 3. Test Ordering:
- Programs should appear in order (1, 2, 3, etc.)
- Change `order` values to test

## 🐛 Troubleshooting

### Program not showing in navbar?
✅ Check `showInNavbar` is `true`
✅ Verify JSON file is in `content/program-pages/`
✅ Restart dev server: `Ctrl+C` then `npm run dev`

### Program page not found (404)?
✅ Check `slug` matches the URL you're accessing
✅ Verify filename: `{slug}.json`
✅ Clear Next.js cache: `rm -rf .next && npm run dev`

### Changes not appearing?
✅ Save the file properly
✅ Check browser console for errors
✅ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Programs in wrong order?
✅ Check `order` field values
✅ Ensure they're numbers, not strings
✅ Lower numbers appear first

## 📊 Content Guidelines

### Program Title:
- Clear and descriptive
- Max recommended: 50 characters
- Example: "Digital SkillUp Africa"

### Slug:
- Lowercase only
- Use hyphens for spaces
- No special characters
- Example: "digital-skillup-africa"

### Description:
- 2-3 sentences
- Explain what the program offers
- Highlight key benefits

### Stats:
- Use "+" for ranges (100+, 500+)
- Use "%" for percentages (95%, 85%)
- Keep labels short (1-2 words)

## 🎨 Customization Examples

### Change Program Order:
```json
// Make "AI Now" appear first
{
  "title": "AI Now",
  "order": 1  // Changed from 6
}
```

### Hide from Navbar Temporarily:
```json
{
  "title": "Future Now",
  "showInNavbar": false  // Still accessible via direct URL
}
```

### Add New Stats:
```json
"stats": [
  { "value": "500+", "label": "Graduates" },
  { "value": "15", "label": "Countries" },
  { "value": "85%", "label": "Employment" },
  { "value": "100+", "label": "Partners" }  // New stat
]
```

## 📞 Support

**Files Changed:**
- ✅ `src/app/layout.js` - Fetches programs for navbar
- ✅ `src/components/Navbar.js` - Displays programs dynamically
- ✅ `src/app/programs/[slug]/page.js` - Dynamic program pages
- ✅ `tina/config.js` - CMS schema (already configured)

**Key Locations:**
- Program content: `content/program-pages/`
- Program routes: `src/app/programs/[slug]/`
- Navbar component: `src/components/Navbar.js`
- Tina admin: `http://localhost:3000/admin`

---

**Status:** ✅ Fully Functional
**Last Updated:** December 4, 2025
**Total Programs:** 7 (expandable via Tina CMS)

