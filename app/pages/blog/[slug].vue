<script setup lang="ts">
const route = useRoute()
const {siteUrl} = useRuntimeConfig().public

const {data: post} = await useAsyncData(`blog:${route.path}`, () =>
    queryCollection('blog').path(route.path).first(),
)

if (!post.value) {
  throw createError({statusCode: 404, statusMessage: 'Post not found', fatal: true})
}

const {data: siblings} = await useAsyncData(`blog-siblings:${route.path}`, () =>
    queryCollection('blog')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .select('path', 'title', 'date')
        .all(),
)

const index = computed(() => siblings.value?.findIndex(p => p.path === route.path) ?? -1)
const newer = computed(() => (index.value > 0 ? siblings.value?.[index.value - 1] : undefined))
const older = computed(() =>
    index.value >= 0 ? siblings.value?.[index.value + 1] : undefined,
)

useSeo({
  title: `${post.value.title} — Bart Delrue`,
  description: post.value.description,
  path: route.path,
  type: 'article',
  image: post.value.image,
})

useHead({
  htmlAttrs: {class: 'theme-blog'},
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.value.title,
        'description': post.value.description,
        'datePublished': new Date(post.value.date).toISOString().slice(0, 10),
        'dateModified': new Date(post.value.updated ?? post.value.date).toISOString().slice(0, 10),
        'keywords': post.value.tags,
        'author': {'@type': 'Person', 'name': 'Bart Delrue'},
        'publisher': {'@type': 'Person', 'name': 'Bart Delrue'},
        'mainEntityOfPage': new URL(route.path, siteUrl).href,
      }),
    },
  ],
})

const navLinks = [
  {href: '/', label: 'About me', away: true},
  {href: '/blog', label: 'All posts', away: true},
]

const canonicalUrl = computed(() => new URL(route.path, siteUrl).href)
</script>

<template>
  <div v-if="post">
    <SiteHeader
        class="small"
        tagline="My musings and ramblings"
        quote="&quot;No good at life, but very funny sometimes with the commentary.&quot;"
        quote-source="Kurt Vonnegut"
        link="/blog"
    />

    <SiteNav :links="navLinks"/>

    <main class="container">
      <article class="h-entry pb-3">
        <hgroup>
          <h2 class="p-name">{{ post.title }}</h2>
          <p class="post-meta">
            <PostDate class="dt-published" :date="post.date"/>
            <template v-if="post.updated">
              &middot;
              <PostDate class="dt-updated" :date="post.updated" prefix="updated"/>
            </template>
          </p>
        </hgroup>

        <ul v-if="post.tags?.length" class="tags">
          <li v-for="tag in post.tags" :key="tag" class="p-category">{{ tag }}</li>
        </ul>

        <div class="prose e-content">
          <ContentRenderer :value="post"/>
        </div>

        <data class="u-url u-uid" :value="canonicalUrl"/>
        <p class="p-author h-card" hidden>
          <a class="p-name u-url" href="https://ctrlaltdelrue.be/">Bart Delrue</a>
        </p>
      </article>
    </main>
  </div>
</template>

<style scoped>
article {
  margin-inline: auto;
  max-inline-size: 70ch;

  @media (min-width: 60em) {
    font-size: 1.6em;
  }
}

.prose {
  &:deep(h3) {
    margin-block-start: 3em;
  }

  &:deep(:is(h3, h4) + p) {
    margin-block-end: 1em;
  }

  &:deep(h4) {
    font-size: 1.15rem;
    margin-block: 2em .5em;
  }

  &:deep(:is(ul, ol)) {
    max-inline-size: 40em;
  }

  &:deep(blockquote) {
    margin-inline: 0;
    max-inline-size: 40em;
    border-inline-start: .15em solid;
    padding-inline-start: 1em;
    font-style: italic;
  }

  &:deep(:is(code, kbd)) {
    font-family: ui-monospace, "Cascadia Code", "Fira Code", monospace;
    font-size: .85em;
    background-color: oklch(1 0 0 / .1);
    padding-block: .1em;
    padding-inline: .35em;
    border-radius: .2em;
  }

  &:deep(pre) {
    max-inline-size: 50em;
    overflow-inline: auto;
    padding: 1em;
    border: 1px solid oklch(1 0 0 / .15);
    border-radius: .3em;
    background-color: oklch(0 0 0 / .3);

    code {
      background: none;
      padding: 0;
    }
  }

  &:deep(:is(img, video)) {
    max-inline-size: 100%;
    block-size: auto;
  }

  &:deep(hr) {
    max-inline-size: 40em;
    margin-block: 5rem;
    margin-inline: 0;
    border: 0;
    border-block-start: 1px solid oklch(1 0 0 / .5);
  }
}
</style>