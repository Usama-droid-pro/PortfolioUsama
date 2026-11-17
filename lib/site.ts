// Public URL of the site. On Vercel this is the production domain; set
// NEXT_PUBLIC_SITE_URL to override (for example once a custom domain is added).
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
