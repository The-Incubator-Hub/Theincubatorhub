import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
        ui: {
          // This is an DEMO router. You can remove this to fit your site
          router: ({ document }) => `/demo/blog/${document._sys.filename}`,
        },
      },
      {
        name: "blogPost",
        label: "Blog Posts",
        path: "content/blog-posts",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "URL-friendly identifier (e.g., 'future-of-tech-education')",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Success Stories",
              "Community",
              "Education",
              "Industry Insight",
              "Technology",
              "Cybersecurity",
              "Industry Inclusivity"
            ],
          },
          {
            type: "string",
            name: "featuredTag",
            label: "Featured Tag",
            description: "Tag to show (e.g., 'FEATURED')",
          },
          {
            type: "string",
            name: "secondaryTag",
            label: "Secondary Tag",
            description: "Secondary category tag",
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
          },
          {
            type: "string",
            name: "readTime",
            label: "Reading Time",
            description: "e.g., '5 mins'",
          },
          {
            type: "number",
            name: "likes",
            label: "Initial Likes Count",
          },
          {
            type: "rich-text",
            name: "content",
            label: "Article Content",
            isBody: true,
          },
          {
            type: "object",
            name: "tags",
            label: "Tags",
            list: true,
            fields: [
              {
                type: "string",
                name: "name",
                label: "Tag Name",
              },
            ],
          },
          {
            type: "object",
            name: "relatedPosts",
            label: "Related Posts",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "category",
                label: "Category",
              },
              {
                type: "string",
                name: "author",
                label: "Author",
              },
              {
                type: "string",
                name: "date",
                label: "Date",
              },
              {
                type: "string",
                name: "readTime",
                label: "Read Time",
              },
              {
                type: "number",
                name: "likes",
                label: "Likes",
              },
            ],
          },
        ],
        ui: {
          router: ({ document }) => `/blogdetails/${document.slug || document._sys.filename}`,
        },
      },
      {
        name: "teams",
        label: "Teams Page",
        path: "content/teams",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "teamIntro",
            label: "Team Intro Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "teamGrid",
            label: "Team Grid Section",
            fields: [
              {
                type: "object",
                name: "members",
                label: "Team Members",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Role",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "object",
                    name: "socials",
                    label: "Social Links",
                    fields: [
                      {
                        type: "string",
                        name: "facebook",
                        label: "Facebook URL",
                      },
                      {
                        type: "string",
                        name: "linkedin",
                        label: "LinkedIn URL",
                      },
                      {
                        type: "string",
                        name: "twitter",
                        label: "Twitter URL",
                      },
                      {
                        type: "string",
                        name: "instagram",
                        label: "Instagram URL",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "joinUs",
            label: "Join Us Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Link",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/teams`,
        },
      },
      {
        name: "home",
        label: "Home Page",
        path: "content/home",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "highlightedText",
                label: "Highlighted Text",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "primaryButtonText",
                label: "Primary Button Text",
              },
              {
                type: "string",
                name: "secondaryButtonText",
                label: "Secondary Button Text",
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
            ],
          },
          {
            type: "object",
            name: "aboutIncubator",
            label: "About Incubator Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description1",
                label: "Description Paragraph 1",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "description2",
                label: "Description Paragraph 2",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "studentsEnrolled",
                label: "Students Enrolled Count",
              },
              {
                type: "string",
                name: "reviewsCount",
                label: "Reviews Count",
              },
            ],
          },
          {
            type: "object",
            name: "statistics",
            label: "Statistics Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "object",
                name: "stats",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "number",
                    label: "Number",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/`,
        },
      },
      {
        name: "about",
        label: "About Page",
        path: "content/about",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
        ],
        ui: {
          router: () => `/about`,
        },
      },
      {
        name: "blog",
        label: "Blog Page",
        path: "content/blog",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "future",
            label: "Future Section (Search & Filters)",
            fields: [
              {
                type: "string",
                name: "searchPlaceholder",
                label: "Search Placeholder Text",
              },
              {
                type: "object",
                name: "filters",
                label: "Filter Categories",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Filter Name",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "blogPostsGrid",
            label: "Blog Posts Grid Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
                ui: { component: "textarea" },
              },
            ],
          },
        ],
        ui: {
          router: () => `/blog`,
        },
      },
      {
        name: "programs",
        label: "Programs Page",
        path: "content/programs",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "programHeader",
            label: "Program Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "programs",
                label: "Program Tags",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Program Name",
                  },
                ],
              },
              {
                type: "object",
                name: "stats",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "value",
                    label: "Value",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                ],
              },
              {
                type: "object",
                name: "images",
                label: "Header Images",
                list: true,
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "learningPathway",
            label: "Learning Pathway Section",
            fields: [
              {
                type: "object",
                name: "phases",
                label: "Phases",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    description: "e.g., 'Lightbulb', 'Target', 'Award'",
                    options: ["Lightbulb", "Target", "Award", "CheckCircle", "Briefcase", "Users", "Rocket"],
                  },
                  {
                    type: "string",
                    name: "color",
                    label: "Color",
                    description: "e.g., 'orange', 'yellow', 'green'",
                    options: ["orange", "yellow", "green"],
                  },
                ],
              },
              {
                type: "object",
                name: "objectives",
                label: "Objectives",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Objective Text",
                  },
                ],
              },
              {
                type: "object",
                name: "outcomes",
                label: "Expected Outcomes",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    description: "e.g., 'Briefcase', 'Rocket', 'Users', 'CheckCircle'",
                    options: ["Briefcase", "Rocket", "Users", "CheckCircle"],
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Outcome Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "videoSection",
            label: "Video Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Video Thumbnail Image",
              },
              {
                type: "string",
                name: "videoUrl",
                label: "Video URL (YouTube or direct link)",
              },
            ],
          },
          {
            type: "object",
            name: "partners",
            label: "Partners Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "object",
                name: "partners",
                label: "Partners",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Partner Name",
                  },
                  {
                    type: "image",
                    name: "logoUrl",
                    label: "Logo",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "company",
                    label: "Company",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Profile Image",
                  },
                  {
                    type: "string",
                    name: "text",
                    label: "Testimonial Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "gallery",
            label: "Gallery Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
              {
                type: "object",
                name: "images",
                label: "Images",
                list: true,
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/programs`,
        },
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "content/contact",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "contactSection",
            label: "Contact Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "email",
                label: "Email Address",
              },
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
              },
              {
                type: "string",
                name: "addressLine1",
                label: "Address Line 1",
              },
              {
                type: "string",
                name: "addressLine2",
                label: "Address Line 2",
              },
              {
                type: "object",
                name: "socialMedia",
                label: "Social Media Links",
                fields: [
                  {
                    type: "string",
                    name: "facebook",
                    label: "Facebook URL",
                  },
                  {
                    type: "string",
                    name: "twitter",
                    label: "Twitter URL",
                  },
                  {
                    type: "string",
                    name: "linkedin",
                    label: "LinkedIn URL",
                  },
                  {
                    type: "string",
                    name: "instagram",
                    label: "Instagram URL",
                  },
                  {
                    type: "string",
                    name: "youtube",
                    label: "YouTube URL",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/contact`,
        },
      },
      {
        name: "careers",
        label: "Careers Page",
        path: "content/careers",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "teamIntro",
            label: "Team Intro Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "jobListings",
            label: "Job Listings Section",
            fields: [
              {
                type: "object",
                name: "jobs",
                label: "Jobs",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Job Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "department",
                    label: "Department",
                  },
                  {
                    type: "string",
                    name: "location",
                    label: "Location",
                  },
                  {
                    type: "string",
                    name: "type",
                    label: "Job Type",
                    options: ["Full-time", "Part-time", "Hybrid", "Remote"],
                  },
                  {
                    type: "boolean",
                    name: "urgent",
                    label: "Urgent",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "applyLink",
                    label: "Apply Now Link",
                    description: "URL for the Apply Now button (e.g., /apply/senior-software-engineer or https://example.com/apply)",
                  },
                  {
                    type: "string",
                    name: "viewDetailsLink",
                    label: "View Details Link",
                    description: "URL for the View Details button (e.g., /careers/senior-software-engineer or https://example.com/job-details)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "resumeCTA",
            label: "Resume CTA Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "string",
                name: "buttonLink",
                label: "Button Link",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/careers`,
        },
      },
      {
        name: "getinvolved",
        label: "Get Involved Page",
        path: "content/getinvolved",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "getInvolvedSection",
            label: "Get Involved Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "opportunities",
                label: "Opportunities",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    description: "e.g., 'Heart', 'ThumbsUp', 'Users'",
                    options: ["Heart", "ThumbsUp", "Users", "ArrowRight", "Check"],
                  },
                  {
                    type: "string",
                    name: "iconBg",
                    label: "Icon Background Color",
                    description: "Tailwind color class (e.g., 'bg-orange-500', 'bg-blue-500')",
                  },
                  {
                    type: "object",
                    name: "achievements",
                    label: "Achievements List",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "text",
                        label: "Achievement Text",
                      },
                    ],
                  },
                  {
                    type: "string",
                    name: "commitment",
                    label: "Commitment Text",
                    description: "e.g., 'Flexible - 2-4 hours per week'",
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
                  },
                  {
                    type: "string",
                    name: "buttonLink",
                    label: "Button Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/getinvolved`,
        },
      },
      {
        name: "press",
        label: "Press Page",
        path: "content/press",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "newsSection",
            label: "News Section",
            fields: [
              {
                type: "string",
                name: "searchPlaceholder",
                label: "Search Placeholder",
              },
              {
                type: "object",
                name: "categories",
                label: "Categories",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Category Name",
                  },
                ],
              },
              {
                type: "object",
                name: "featuredPost",
                label: "Featured Post",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                  },
                  {
                    type: "string",
                    name: "readTime",
                    label: "Read Time",
                  },
                  {
                    type: "object",
                    name: "category",
                    label: "Category Tags",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "tag",
                        label: "Tag",
                      },
                    ],
                  },
                  {
                    type: "string",
                    name: "readFullStoryLink",
                    label: "Read Full Story Link",
                  },
                ],
              },
              {
                type: "string",
                name: "latestNewsTitle",
                label: "Latest News Title",
              },
              {
                type: "string",
                name: "latestNewsDescription",
                label: "Latest News Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "newsPosts",
                label: "News Posts",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "date",
                    label: "Date",
                  },
                  {
                    type: "string",
                    name: "learnMoreLink",
                    label: "Learn More Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/press`,
        },
      },
      {
        name: "donate",
        label: "Donate Page",
        path: "content/donate",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "donateSection",
            label: "Donate Section (Hero)",
            fields: [
              {
                type: "string",
                name: "heading",
                label: "Heading",
              },
              {
                type: "string",
                name: "highlightedText",
                label: "Highlighted Text",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "technologies",
                label: "Technology Tags",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Technology Name",
                  },
                ],
              },
              {
                type: "object",
                name: "stats",
                label: "Statistics",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "value",
                    label: "Value",
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                  },
                ],
              },
              {
                type: "string",
                name: "studentsImpacted",
                label: "Students Impacted Count",
              },
              {
                type: "image",
                name: "image",
                label: "Hero Image",
              },
            ],
          },
          {
            type: "object",
            name: "donationForm",
            label: "Donation Form Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Form Title",
              },
              {
                type: "string",
                name: "description",
                label: "Form Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Submit Button Text",
              },
            ],
          },
          {
            type: "object",
            name: "bankTransfer",
            label: "Bank Transfer Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Section Description",
              },
              {
                type: "object",
                name: "nairaAccount",
                label: "Naira Account",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Account Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "bankName",
                    label: "Bank Name",
                  },
                  {
                    type: "string",
                    name: "accountName",
                    label: "Account Name",
                  },
                  {
                    type: "string",
                    name: "accountNumber",
                    label: "Account Number",
                  },
                ],
              },
              {
                type: "object",
                name: "usdAccount",
                label: "USD Account",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Account Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "bankName",
                    label: "Bank Name",
                  },
                  {
                    type: "string",
                    name: "accountName",
                    label: "Account Name",
                  },
                  {
                    type: "string",
                    name: "accountNumber",
                    label: "Account Number",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/donate`,
        },
      },
      {
        name: "faqs",
        label: "FAQs Page",
        path: "content/faqs",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "teamIntro",
            label: "Team Intro Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "faqAccordion",
            label: "FAQ Accordion Section",
            fields: [
              {
                type: "object",
                name: "items",
                label: "FAQ Items",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "question",
                    label: "Question",
                    required: true,
                  },
                  {
                    type: "rich-text",
                    name: "answer",
                    label: "Answer",
                    isBody: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "stillHaveQuestions",
            label: "Still Have Questions Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "cards",
                label: "Cards",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    description: "e.g., 'Cpu', 'Database', 'Package'",
                  },
                  {
                    type: "string",
                    name: "iconColor",
                    label: "Icon Color",
                    description: "e.g., 'orange-600', 'green-600', 'blue-600'",
                  },
                  {
                    type: "string",
                    name: "title",
                    label: "Card Title",
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
                  },
                  {
                    type: "string",
                    name: "buttonIcon",
                    label: "Button Icon",
                    description: "e.g., 'Mail', 'Bookmark'",
                  },
                ],
              },
            ],
          },
        ],
        ui: {
          router: () => `/faqs`,
        },
      },
      {
        name: "gallery",
        label: "Gallery Page",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "photoVideoSection",
            label: "Photo/Video Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Section Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "filterButtons",
                label: "Filter Buttons",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Filter Name",
                  },
                ],
              },
              {
                type: "object",
                name: "images",
                label: "Images",
                list: true,
                fields: [
                  {
                    type: "image",
                    name: "src",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
              {
                type: "object",
                name: "videos",
                label: "Videos",
                list: true,
                fields: [
                  {
                    type: "image",
                    name: "thumbnail",
                    label: "Video Thumbnail",
                  },
                  {
                    type: "string",
                    name: "videoUrl",
                    label: "Video URL",
                    description: "YouTube, Vimeo, or direct video URL",
                  },
                  {
                    type: "string",
                    name: "alt",
                    label: "Alt Text",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "ctaBanner",
            label: "CTA Banner Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "buttonText",
                label: "Button Text",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/gallery`,
        },
      },
      {
        name: "resources",
        label: "Resources Page",
        path: "content/resources",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "learningResources",
            label: "Learning Resources Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "searchPlaceholder",
                label: "Search Placeholder",
              },
              {
                type: "object",
                name: "resources",
                label: "Resource Cards",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon Name",
                    description: "e.g., 'CloudFolder', 'StackedBooks', 'BriefcaseIcon', 'CrossedWrenches', 'HandshakeIcon'",
                    options: ["CloudFolder", "StackedBooks", "BriefcaseIcon", "CrossedWrenches", "HandshakeIcon"],
                  },
                  {
                    type: "boolean",
                    name: "highlighted",
                    label: "Highlighted",
                    description: "Make this card highlighted (green background)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "viewResources",
            label: "View Resources Section",
            fields: [
              {
                type: "object",
                name: "resourceCards",
                label: "Resource Cards",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "tags",
                    label: "Tags",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "tag",
                        label: "Tag",
                      },
                    ],
                  },
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    description: "e.g., 'Template Collection'",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                  {
                    type: "string",
                    name: "viewResourceLink",
                    label: "View Resource Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "joinUs",
            label: "Join Us Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Link",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/resources`,
        },
      },
      {
        name: "testimonies",
        label: "Testimonies Page",
        path: "content/testimonies",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "object",
            name: "header",
            label: "Header Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
          {
            type: "object",
            name: "teamIntro",
            label: "Team Intro Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "testimonials",
            label: "Testimonials Section",
            fields: [
              {
                type: "object",
                name: "categories",
                label: "Categories",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Category Name",
                  },
                ],
              },
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "role",
                    label: "Role",
                  },
                  {
                    type: "string",
                    name: "category",
                    label: "Category",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "quote",
                    label: "Quote",
                    ui: { component: "textarea" },
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Profile Image",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "joinUs",
            label: "Join Us Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "description",
                label: "Description",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Button Text",
              },
              {
                type: "string",
                name: "ctaLink",
                label: "CTA Link",
              },
              {
                type: "image",
                name: "backgroundImage",
                label: "Background Image",
              },
            ],
          },
        ],
        ui: {
          router: () => `/testimonies`,
        },
      },
    ],
  },
});
