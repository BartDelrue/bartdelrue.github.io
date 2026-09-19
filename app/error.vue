<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => props.error?.statusCode === 404)

useHead({
  title: isNotFound.value ? 'Page not found' : 'Something went wrong',
})

const navLinks = [
  { href: '/', label: 'About me', away: true },
  { href: '/blog', label: 'Blog', away: true },
]
</script>

<template>
  <div>
    <SiteHeader
      tagline="Nothing to see here"
      quote="&quot;Not all those who wander are lost.&quot;"
      quote-source="J.R.R. Tolkien"
    />

    <SiteNav :links="navLinks" />

    <main class="container">
      <article class="pb-3">
        <p v-if="isNotFound">
          But you are.<br>
          This page does not exist, or it did once and I moved it. Sorry about that.
        </p>
        <p v-else>
          {{ error?.statusMessage || 'Something went wrong.' }}
        </p>
      </article>
    </main>

    <SiteFooter />
  </div>
</template>
