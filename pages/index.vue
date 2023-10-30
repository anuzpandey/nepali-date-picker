<script setup>
import BgBlurAbstract from '~/components/Svg/BgBlurAbstract.vue'
import BgGrid from '~/components/Svg/BgGrid.vue'

const changeLogs = {
  version: '1.2.0',
  link: "https://github.com/anuzpandey/nepali-date-picker/releases/tag/v.1.2.0"
}
</script>

<template>
  <div class="page-container relative min-h-[calc(100vh-154px)] flex flex-col md:flex-row gap-x-10 items-center pt-10 pb-24 sm:pb-32 lg:flex lg:py-10">

    <BgGrid/>

    <BgBlurAbstract/>

    <div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:pt-8">

      <div class="mb-6">
        <a class="inline-flex space-x-6" target="_blank" :href="changeLogs.link">
          <span class="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">What's new</span>
          <span class="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
              <span>Just shipped v{{ changeLogs.version }}</span>
              <Icon aria-hidden="true" class="h-4 w-4 text-gray-500" name="heroicons:chevron-right"/>
            </span>
        </a>
      </div>

      <h1 class="inline font-light bg-gradient-to-r from-indigo-400 via-sky-400 to-indigo-200 bg-clip-text font-display text-3xl leading-normal md:text-4xl md:leading-normal lg:text-5xl lg:leading-tight text-transparent">
        Lightweight, Powerful JavaScript <span class="font-medium">Nepali Date Picker</span> with no dependencies.
      </h1>
      <p class="mt-6 text-lg leading-8 text-gray-300">Meet our user-friendly Nepali Date Picker, tailor-made for Nepal's date format. It's easy to use, doesn't rely on other tools, and makes handling Nepali dates in your web apps a breeze.</p>
      <div class="mt-10 flex items-center gap-x-4">
        <NuxtLink class="btn btn-primary" to="/docs">Get started</NuxtLink>
        <a class="btn btn-muted" target="_blank" href="https://github.com/anuzpandey/nepali-date-picker">View on Github</a>
      </div>
    </div>

    <div class="mt-16 w-full">
      <img
        alt="App screenshot"
        class="w-full"
        src="/img/hero-image.svg"
      />
    </div>
  </div>
</template>

<style scoped>

</style>