/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://portfolio-delta-ten-66.vercel.app",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/home"],
};
