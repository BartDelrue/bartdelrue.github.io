<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-index', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .select('path', 'title', 'description', 'date', 'tags')
    .all(),
)

useSeo({
  title: 'Musings of Bart Delrue',
  description: 'Musings, ramblings and other nonsense by Bart Delrue.',
  path: '/blog',
})

useHead({
  htmlAttrs: { class: 'theme-blog' },
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Blog',
        'name': 'Musings of Bart Delrue',
        'url': 'https://ctrlaltdelrue.be/blog',
        'author': { '@type': 'Person', 'name': 'Bart Delrue' },
      }),
    },
  ],
})

const navLinks = [
  { href: '/', label: 'About me', away: true },
]

onMounted(() => {
  const slug = window.location.hash.slice(1)
  if (!slug) return

  const match = posts.value?.find(post => post.path === `/blog/${slug}`)
  if (match) navigateTo(match.path, { replace: true })
})
</script>

<template>
  <div>
    <SiteHeader
      tagline="My musings and ramblings"
      quote="&quot;No good at life, but very funny sometimes with the commentary.&quot;"
      quote-source="Kurt Vonnegut"
    />

    <SiteNav :links="navLinks" />

    <main class="container">
      <h2 class="visually-hidden">Posts</h2>

      <ul class="post-list">
        <li v-for="post in posts" :key="post.path">
          <article>
            <hgroup>
              <h3><NuxtLink :to="post.path">{{ post.title }}</NuxtLink></h3>
              <p class="post-meta">
                <PostDate :date="post.date" />
              </p>
            </hgroup>
            <p>{{ post.description }}</p>
            <ul v-if="post.tags?.length" class="tags">
              <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
            </ul>
            <p>
              <NuxtLink class="read-more" :to="post.path">
                Read <span class="visually-hidden">{{ post.title }}</span> &rarr;
              </NuxtLink>
            </p>
          </article>
        </li>
      </ul>

      <p class="pb-3">
        <a href="/blog/rss.xml">Subscribe via RSS</a>
      </p>
    </main>
  </div>
</template>

<style scoped>
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    margin-block-end: 4rem;
    max-inline-size: 70ch;
  }
}

.read-more {
  display: inline-block;
  margin-block-start: 1em;
}
</style>