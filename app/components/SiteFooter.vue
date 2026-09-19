<script setup lang="ts">
const { webmentionEndpoint, siteUrl } = useRuntimeConfig().public
const route = useRoute()

const target = computed(() => new URL(route.path, siteUrl).href)

const mentions = ref<number | null>(null)
const status = ref<'idle' | 'sent' | 'error'>('idle')
const source = ref('')

onMounted(async () => {
  try {
    const data = await $fetch<{ mentions?: number }>(webmentionEndpoint, {
      query: { target: target.value },
    })
    if (data?.mentions) mentions.value = data.mentions
  } catch {
  }
})

async function send() {
  try {
    await $fetch(webmentionEndpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ source: source.value, target: target.value }).toString(),
    })
    source.value = ''
    status.value = 'sent'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <footer>
    <div class="container">
      <form @submit.prevent="send">
        <p>
          <span v-if="mentions">This page has been mentioned {{ mentions }} times!</span><br>
          Did you mention my site, make sure to drop a
          <a href="https://www.w3.org/TR/webmention/">Webmention</a>.
        </p>
        <div>
          <label for="source">Bart, you were mentioned on:</label>
          <input id="source" v-model="source" type="url" name="source" required>
          <button type="submit">Send!</button>
        </div>
        <p v-if="status === 'sent'" role="status">Webmention sent!</p>
        <p v-else-if="status === 'error'" role="status">
          Sadly, an error occurred. Do not worry, it was probably my fault!
        </p>
      </form>
      <p>&copy; Bart Delrue - {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: var(--fg);
  color: var(--bg);
  padding-block: 2rem;
}

form {
  input,
  button {
    border: 2px solid var(--bg);
    block-size: 100%;
    display: inline-block;
  }

  button {
    background-color: oklch(1 0 0);
    font-variant: all-petite-caps;
    font-size: .8em;
    letter-spacing: .1em;
  }
}
</style>
