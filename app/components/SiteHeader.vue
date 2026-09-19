<script setup lang="ts">
defineProps<{
  tagline: string
  quote: string
  quoteSource: string
  link?: string
}>()
</script>

<template>
  <header class="container">
    <div class="column">
      <hgroup>
        <h1 class="text-xs-center"><em>Bart</em> Delrue</h1>
        <p v-if="!link">{{ tagline }}</p>
        <NuxtLink v-else :to="link">{{tagline}}</NuxtLink>
      </hgroup>
      <LogoMark />
    </div>

    <figure class="quote">
      <blockquote>{{ quote }}</blockquote>
      <figcaption>{{ quoteSource }}</figcaption>
    </figure>
  </header>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-block: 4rem 2rem;

  hgroup {
    font-size: clamp(3rem, 8vh, 6rem);
    max-inline-size: max-content;

    h1 {
      font-size: 1em;
      line-height: 1;
      margin: 0;
      margin-inline-start: -.07em;

      em {
        font-style: normal;
        position: relative;

        &::after {
          content: "";
          display: block;
          background-color: var(--fg);
          block-size: 100%;
          inline-size: 100%;
          position: absolute;
          filter: blur(.8em);
          inset-block-start: 0;
          background-blend-mode: hue;
        }
      }
    }

    p,
    a {
      margin: 0;
      font-size: .39em;
      font-variant: all-petite-caps;
      letter-spacing: unset;
      text-decoration: none;
    }
  }

  figure.quote {
    display: none;
    margin: 0;
    max-inline-size: 40em;
    font-size: clamp(1rem, 4vw, 1.2rem);
    flex: 0 1 30%;

    blockquote {
      margin: 0;
      margin-block-end: 1em;
      border-inline-start: .1em solid;
      padding-inline-start: 1em;
    }

    figcaption {
      font-size: .6em;
      text-align: end;
    }
  }

  @media (min-width: 60rem) {
    flex-direction: row;
    gap: 10%;

    &:not(.small) figure.quote {
      display: block;
    }
  }

  &.small {
    hgroup {
      font-size: 3rem;
    }

    .column {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      justify-content: center;
    }

    svg {
      inline-size: 14rem;
      margin-block: 0;
    }

    .figure {
      display: none;
    }
  }
}
</style>
