const baseUrl = process.env.SITE_CHECK_URL || "http://localhost:3000";

const routes = [
  "/",
  "/visual-artist",
  "/visual-artist/personal-projects",
  "/visual-artist/short-films",
  "/visual-artist/commercial",
  "/visual-artist/cinematic",
  "/visual-artist/flow-edit",
  "/visual-artist/new-stack",
  "/music-production",
  "/art-direction",
  "/robots.txt",
  "/sitemap.xml",
];

const requiredHomePatterns = [
  /<meta property="og:image" content="[^"]*\/images\/og-preview\.jpg"/,
  /<meta name="twitter:card" content="summary_large_image"/,
  /<title>Himanshu Chaudhari \| Cinematic Portfolio<\/title>/,
];

const failures = [];

async function checkRoute(route) {
  const url = new URL(route, baseUrl);
  const response = await fetch(url);
  const text = await response.text();

  if (!response.ok) {
    failures.push(`${route} returned ${response.status}`);
    return text;
  }

  if (!text.trim()) {
    failures.push(`${route} returned an empty response`);
  }

  return text;
}

for (const route of routes) {
  await checkRoute(route);
}

const home = await checkRoute("/");

for (const pattern of requiredHomePatterns) {
  if (!pattern.test(home)) {
    failures.push(`Home page is missing required metadata: ${pattern}`);
  }
}

const robots = await checkRoute("/robots.txt");
if (!robots.includes("Sitemap:")) {
  failures.push("robots.txt is missing sitemap reference");
}

const sitemap = await checkRoute("/sitemap.xml");
if (!sitemap.includes("/visual-artist/personal-projects")) {
  failures.push("sitemap.xml is missing visual artist project routes");
}

if (failures.length > 0) {
  console.error("Site verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Verified ${routes.length} routes at ${baseUrl}`);
