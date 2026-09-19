import { queryCollection } from '@nuxt/content/server'

interface FeedItem {
  title: string
  link: string
  guid: string
  description: string
  date: string
}

const extraItems: FeedItem[] = [
  {
    title: 'Presentation: RSS',
    link: 'https://ctrlaltdelrue.be/talks/RSS/',
    guid: 'https://bartdelrue.github.io/talks/RSS/',
    date: '2025-02-12',
    description: `<p>I gave a talk on RSS for the web topics course at Odisee:
              <a href="https://ctrlaltdelrue.be/talks/RSS/">Presentation here</a>.</p>
              <iframe src="https://ctrlaltdelrue.be/talks/RSS/" title="RSS" width="800" height="500"></iframe>`,
  },
  {
    title: 'Presentation: Webmention',
    link: 'https://ctrlaltdelrue.be/talks/webmention/',
    guid: 'https://bartdelrue.github.io/talks/webmention/',
    date: '2025-02-12',
    description: `<p>I gave a talk on the webmention specification for the web topics course at Odisee:
              <a href="https://ctrlaltdelrue.be/talks/webmention/">Presentation here</a>.</p>
              <iframe src="https://ctrlaltdelrue.be/talks/webmention/" title="webmention" width="800" height="500"></iframe>`,
  },
]

function pubDate(date: string | Date) {
  return new Date(date).toUTCString().replace(/GMT$/, '+0000')
}

export default defineEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'feedDescription', 'date', 'guid')
    .all()

  const items: FeedItem[] = [
    ...posts.map(post => ({
      title: post.title,
      link: absolute(post.path),
      guid: post.guid ?? absolute(post.path),
      description: post.feedDescription ?? escapeXml(post.description),
      date: String(post.date),
    })),
    ...extraItems,
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const body = items.map(item => `
        <item>
            <title>${escapeXml(item.title)}</title>
            <link>${item.link}</link>
            <description><![CDATA[
${item.description.trimEnd()}
      ]]></description>
            <pubDate>${pubDate(item.date)}</pubDate>
            <guid>${item.guid}</guid>
        </item>`).join('\n')

  const lastBuildDate = pubDate(items[0]?.date ?? new Date())

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>Musings of Bart Delrue</title>
        <link>${absolute('/blog')}</link>
        <description>Musings, ramblings and other nonsense by Bart Delrue.</description>
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <image>
            <url>${absolute('/apple-touch-icon.png')}</url>
            <title>Musings of Bart Delrue</title>
            <link>${absolute('/blog')}</link>
        </image>
${body}
    </channel>
</rss>
`
})
