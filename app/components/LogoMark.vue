<template>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 327 327"
  >
    <circle class="cls-1" cx="229.03" cy="163.63" r="32.76" />
    <circle class="cls-1" cx="97.97" cy="229.16" r="32.76" />
    <circle class="cls-1" cx="229.03" cy="98.1" r="32.76" />
    <circle class="cls-1" cx="97.97" cy="163.63" r="32.76" />
    <path d="M98,130.86a32.77,32.77,0,0,1,32.77,32.77V130.86Z" />
    <path d="M98,261.92h32.77V229.16A32.77,32.77,0,0,1,98,261.92Z" />
    <path d="M98,196.39a32.77,32.77,0,0,1,32.77,32.77V163.63A32.77,32.77,0,0,1,98,196.39Z" />
    <path d="M196.26,130.86H130.74a65.52,65.52,0,0,1,65.52,65.53V130.86Z" />
    <path d="M130.74,261.92h65.52V196.39A65.52,65.52,0,0,1,130.74,261.92Z" />
    <path d="M229,65.33H196.26V98.1A32.77,32.77,0,0,1,229,65.33Z" />
    <path d="M196.26,163.63v32.76H229A32.77,32.77,0,0,1,196.26,163.63Z" />
    <path d="M229,130.86A32.77,32.77,0,0,1,196.26,98.1v65.53A32.77,32.77,0,0,1,229,130.86Z" />
    <path d="M196.26,65.33H130.74v65.53A65.52,65.52,0,0,1,196.26,65.33Z" />
    <path d="M130.74,130.86v65.53h65.52A65.52,65.52,0,0,1,130.74,130.86Z" />
    <path d="M65.21,229.16v32.76H98A32.76,32.76,0,0,1,65.21,229.16Z" />
    <path d="M229,196.39h32.76V163.63A32.76,32.76,0,0,1,229,196.39Z" />
    <rect class="cls-2" x="32.44" y="28.98" width="262.12" height="262.12" />
  </svg>
</template>

<style scoped>
svg {
  --color: var(--fg);

  aspect-ratio: 1 / 1;
  inline-size: 100%;
  opacity: .9;
  filter: drop-shadow(0 0 1em var(--fg));
  margin-block-start: clamp(0px, 5vh, 4rem);

  .cls-1,
  .cls-2 {
    fill: none;
  }

  path {
    fill: var(--color);
    stroke: var(--color);
    animation: fadeIn calc(pow(var(--i), 2) * .1s) ease-out forwards;

    &:nth-of-type(1) {
      --i: 1;
    }

    &:nth-of-type(2) {
      --i: 2;
    }

    &:nth-of-type(3) {
      --i: 3;
    }

    &:nth-of-type(4) {
      --i: 4;
    }

    &:nth-of-type(n+5) {
      --i: 5;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    filter: blur(1em);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
