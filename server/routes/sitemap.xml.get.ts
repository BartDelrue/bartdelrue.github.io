import { queryCollection } from '@nuxt/content/server'

const staticPages: Array<{ loc: string, priority: string }> = [
  { loc: '/', priority: '1' },
  { loc: '/blog', priority: '0.9' },
  { loc: '/contrast', priority: '0.9' },
  { loc: '/balls', priority: '0.9' },
  { loc: 'https://bartdelrue.github.io/tutorial', priority: '0.9' },
  { loc: 'https://bartdelrue.github.io/gentselieven', priority: '0.9' },
]

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'date', 'updated')
    .all()

  const urls = [
    ...staticPages.map(page => `
    <url>
        <loc>${absolute(page.loc)}</loc>
        <priority>${page.priority}</priority>
    </url>`),
    ...posts.map(post => `
    <url>
        <loc>${absolute(post.path)}</loc>
        <lastmod>${new Date(post.updated ?? post.date).toISOString().slice(0, 10)}</lastmod>
        <priority>0.7</priority>
    </url>`),
  ].join('')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>
`
})
