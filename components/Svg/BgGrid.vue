<script setup>
const props = defineProps({
  additionClasses: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <svg
    aria-hidden="true"
    :class="`fixed inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] ${additionClasses}`"
  >
    <defs>
      <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" height="200" patternUnits="userSpaceOnUse" width="200" x="50%" y="-1">
        <path d="M.5 200V.5H200" fill="none"/>
      </pattern>
    </defs>
    <svg class="overflow-visible fill-gray-800/20" x="50%" y="-1">
      <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" stroke-width="0"/>
    </svg>
    <rect fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" height="100%" stroke-width="0" width="100%"/>
  </svg>
</template>