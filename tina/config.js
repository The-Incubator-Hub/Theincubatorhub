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
    ],
  },
});
