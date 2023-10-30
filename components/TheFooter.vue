<script setup>

const year = new Date().getFullYear()

const navigation = [
  {
    name: 'GitHub',
    href: 'https://github.com/anuzpandey/nepali-date-picker',
    icon: 'uil:github',
  },
]
</script>

<template>
  <footer class="">
    <div class="page-container bg-gray-900 py-8 md:flex md:items-center md:justify-between">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" target="_blank" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <Icon :name="item.icon" aria-hidden="true" class="h-6 w-6"/>
        </a>
      </div>
      <div class="mt-8 md:order-1 md:mt-0">
        <p class="text-center text-base leading-5 text-gray-400 font-light">
          &copy; {{ year }} Nepali Date Picker. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>