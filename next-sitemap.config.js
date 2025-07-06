/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://archive-idea-test-azure.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
} 