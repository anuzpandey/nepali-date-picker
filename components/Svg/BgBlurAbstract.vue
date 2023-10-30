<script setup>
const props = defineProps({
  positionClass: {
    type: String,
    default: 'top-10 left-[calc(50%-4rem)] sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
  }
})
</script>

<template>
  <svg
    aria-hidden="true"
    :class="`absolute max-w-none -z-10 w-[69.25rem] transform-gpu blur-3xl ${positionClass}`"
    viewBox="0 0 1108 632"
  >
    <path d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z" fill="url(#175c433f-44f6-4d59-93f0-c5c51ad5566d)" fill-opacity=".2"/>
    <defs>
      <linearGradient id="175c433f-44f6-4d59-93f0-c5c51ad5566d" gradientUnits="userSpaceOnUse" x1="1220.59" x2="-85.053" y1="432.766" y2="638.714">
        <stop stop-color="#4F46E5"/>
        <stop offset="1" stop-color="#80CAFF"/>
      </linearGradient>
    </defs>
  </svg>
</template>
