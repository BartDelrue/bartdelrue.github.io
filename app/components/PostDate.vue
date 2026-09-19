<script setup lang="ts">
const props = defineProps<{
  date: string | Date
  prefix?: string
}>()

const iso = computed(() => new Date(props.date).toISOString().slice(0, 10))

const label = computed(() =>
  new Date(props.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
)
</script>

<template>
  <time :datetime="iso">{{ prefix ?? 'Posted on' }} {{ label }}</time>
</template>
