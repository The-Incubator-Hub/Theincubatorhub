const DEFAULT_SITE_URL = "http://localhost:3000"

export const siteConfig = {
  name: "The Incubator Hub",
  defaultTitle: "The Incubator Hub",
  description:
    "The Incubator Hub equips Africans with practical tech training, mentorship, and career pathways for high-growth digital opportunities.",
  defaultOgImage: "/incubator-media/incubator-11.webp",
  twitterHandle: "@theincubator_ng",
  keywords: [
    "The Incubator Hub",
    "Tech Training",
    "Bootcamp",
    "Digital Skills",
    "Career Development",
    "Nigeria",
    "Africa",
    "Mentorship",
  ],
}

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : DEFAULT_SITE_URL)

  const withProtocol = configuredUrl.startsWith("http")
    ? configuredUrl
    : `https://${configuredUrl}`

  return withProtocol.replace(/\/+$/, "")
}

export function toAbsoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  return new URL(normalizedPath, `${getSiteUrl()}/`).toString()
}

export function titleFromSlug(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ")
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.defaultOgImage,
  keywords = [],
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors = [],
}) {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`
  const imageUrl = image?.startsWith("http") ? image : toAbsoluteUrl(image)
  const mergedKeywords = [...new Set([...siteConfig.keywords, ...keywords])]

  const metadata = {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      url: toAbsoluteUrl(canonicalPath),
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  }

  if (type === "article") {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors.length ? { authors } : {}),
    }
  }

  return metadata
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: getSiteUrl(),
    logo: toAbsoluteUrl("/images/Iogo_incubator.png"),
    sameAs: [
      "https://www.instagram.com/theincubatornigeria",
      "https://web.facebook.com/theincubatorng",
      "https://ng.linkedin.com/company/theincubatorng",
      "https://youtube.com/@theincubatorhub",
      "https://x.com/theincubator_ng",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "theincubatorng@gmail.com",
        areaServed: "NG",
        availableLanguage: ["English"],
      },
    ],
  }
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${getSiteUrl()}/blog?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

