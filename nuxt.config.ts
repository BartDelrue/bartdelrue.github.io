export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  modules: ['@nuxt/content', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  fonts: {
    defaults: {
      weights: ['100 700'],
    },
    families: [
      { name: 'Cascadia Code', provider: 'local' },
      { name: 'Fira Code', provider: 'local' },
    ],
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://ctrlaltdelrue.be',
      webmentionEndpoint:
        'https://bartdelrue-deno-webmen-35.deno.dev/?key=8856d829e81e47138d093fe44356659a4e4c00d1760239cbb556b6d5d27eb6ec',
    },
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    renderer: {
      anchorLinks: false,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/blog/rss.xml', '/sitemap.xml', '/404.html'],
      failOnError: true,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'me', href: 'https://github.com/BartDelrue' },
        {
          rel: 'webmention',
          href: 'https://bartdelrue-deno-webmen-35.deno.dev/?key=8856d829e81e47138d093fe44356659a4e4c00d1760239cbb556b6d5d27eb6ec',
        },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'RSS Feed for ctrlaltdelrue.be',
          href: '/blog/rss.xml',
        },
        { rel: 'stylesheet', href: '/print.css', media: 'print' },
      ],
    },
  },

  devtools: { enabled: true },
})
