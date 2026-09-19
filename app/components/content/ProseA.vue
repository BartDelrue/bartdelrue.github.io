<script setup lang="ts">
const props = withDefaults(
  defineProps<{ href?: string, target?: string, rel?: string }>(),
  { href: '', target: undefined, rel: undefined },
)

const isInternal = computed(() => props.href.startsWith('/') || props.href.startsWith('#'))
</script>

<template>
  <NuxtLink v-if="isInternal" :to="href" :target="target">
    <slot />
  </NuxtLink>
  <a v-else :href="href" :target="target" rel="noopener">
    <slot />
  </a>
</template>
