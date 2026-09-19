# ctrlaltdelrue.be

Personal site and blog of Bart Delrue, built with [Nuxt 4](https://nuxt.com) and
[Nuxt Content](https://content.nuxt.com) and deployed as a fully static site to GitHub Pages.

## Running locally

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run generate  # static build into .output/public
npx serve .output/public
```

Requires Node 22.5 or newer — the content database uses Node's built-in `node:sqlite`, so there is
no native module to compile.

## Adding a blog post

Create a markdown file in `content/blog/`. The file name becomes the URL, so
`content/blog/hello-world.md` is published at `/blog/hello-world`.

```markdown
---
title: Hello World
description: One or two sentences. Used on the blog index, in the RSS feed and for social previews.
date: 2026-09-19
tags:
  - accessibility
  - RSS
---

Your post, in markdown. The first heading level to use is `###` — `#` and `##` are
taken by the site title and the post title.
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Shown as the post heading |
| `description` | yes | Index listing, RSS `<description>`, `og:description` |
| `date` | yes | Publication date, also the sort order |
| `updated` | no | Shown next to the publication date when present |
| `tags` | no | Rendered as chips; also used as schema.org keywords |
| `image` | no | Path to a social preview image, defaults to `/og_image.png` |
| `draft` | no | `true` keeps the post out of the index, RSS and sitemap |

Commit and push to `master`. The GitHub Actions workflow rebuilds the site and the new post
appears on `/blog`, in `/blog/rss.xml` and in `/sitemap.xml` automatically.

## Structure

```
app/
  assets/css/main.css      site styles
  components/              header, nav, footer, logo, post date
  composables/useSeo.ts    title + Open Graph tags per page
  pages/
    index.vue              the portfolio homepage
    blog/index.vue         post index
    blog/[slug].vue        a single post
  error.vue                404 / error page
content/blog/              the posts, as markdown
public/                    favicons, og image, print.css, CNAME and the `balls` side project
server/routes/
  blog/rss.xml.get.ts      RSS feed, prerendered at build time
  sitemap.xml.get.ts       sitemap, prerendered at build time
```

The `balls` one-pager is plain HTML/CSS/JS and is served untouched from `public/balls/`.

## Deployment

`.github/workflows/deploy.yml` runs `npm run generate` on every push to `master` and publishes
`.output/public` to GitHub Pages.

This requires **Settings → Pages → Build and deployment → Source: GitHub Actions** on the
repository. The custom domain is pinned by `public/CNAME`.
