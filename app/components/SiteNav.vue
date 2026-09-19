<script setup lang="ts">
export interface NavLink {
  href: string
  label: string
  away?: boolean
}

const props = defineProps<{ links: NavLink[] }>()

const nav = useTemplateRef<HTMLElement>('nav')

onMounted(() => {
  if (!nav.value) return
  if (!props.links.some(link => link.href.startsWith('#'))) return

  const entries = new Map<string, HTMLAnchorElement>()

  for (const link of nav.value.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
    const id = link.getAttribute('href')!.slice(1)
    if (document.getElementById(id)) entries.set(id, link)
  }

  const observer = new IntersectionObserver(
    (observed) => {
      for (const entry of observed) {
        entries.get(entry.target.id)?.classList.toggle('active', entry.isIntersecting)
      }
    },
    { threshold: 0.2 },
  )

  for (const id of entries.keys()) observer.observe(document.getElementById(id)!)

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <nav ref="nav">
    <ul>
      <li v-for="link in links" :key="link.href">
        <a v-if="link.href.startsWith('#')" :href="link.href">{{ link.label }}</a>
        <NuxtLink v-else :to="link.href" :class="{ away: link.away }">{{ link.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  position: sticky;
  top: 0;
  z-index: 2;

  ul {
    list-style: none;
    margin: 0;
    margin-block-end: 4rem;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: var(--fg);

    li:first-child a {
      padding-inline-start: 1.5em;
    }

    li:last-child a {
      padding-inline-end: 1.5em;
    }

    a {
      font-size: clamp(.8rem, 2vw, 1rem);
      padding: 1em 1em;
      background-color: var(--fg);
      color: var(--bg);
      text-decoration: none;
      display: block;
      position: relative;
      transition: color .3s ease-in-out, background-color .3s ease-in-out;
      font-variant: all-petite-caps;
      line-height: 1;

      &::after {
        content: '';
        aspect-ratio: 1/1;
        width: 1.2em;
        background-color: var(--bg);
        position: absolute;
        inset-block-end: -.6em;
        inset-inline-start: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        transition: background-color .3s ease-in-out .2s, transform .2s ease-in-out;
      }

      &:hover,
      &:focus-visible,
      &.active {
        outline-color: var(--fg);
        background-color: var(--bg);
        color: var(--fg);

        &::after {
          background-color: var(--fg);
          transform: translateX(-50%) scale(.6);
        }
      }
    }
  }

  @media (min-width: 60rem) {
    position: fixed;
    inset-inline-start: 0;
    height: 100vh;

    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: scale(-1, -1);

    ul {
      flex-direction: row-reverse;
      margin: 0;

      a::after {
        inset-block-end: -.6em;
        transform: translate(0, -50%);
      }

      a:hover,
      a:focus-visible,
      a.active {
        outline-color: var(--fg);
        background-color: var(--bg);
        color: var(--fg);

        &::after {
          background-color: var(--fg);
          transform: translate(0, -50%) scale(.6);
        }
      }
    }
  }
}
</style>
