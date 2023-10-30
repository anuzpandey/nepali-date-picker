<script lang="ts" setup>
import {ref} from 'vue'

const navigation = [
  {name: 'Documentation', to: '/docs'},
  {name: 'Examples', to: '/examples'},
  {name: 'Changelogs', to: '/changelogs'},
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="page-container">
    <nav aria-label="Global" class="flex items-center justify-between pt-6">
      <div class="flex lg:flex-1">
        <NuxtLink class="-m-1.5 p-1.5" to="/">
          <span class="sr-only">Nepali Date Picker</span>
          <img alt="" class="h-10" src="/img/logo.svg"/>
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400" type="button" @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Icon aria-hidden="true" class="h-6 w-6" name="heroicons:bars-3"/>
        </button>
      </div>

      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink v-for="item in navigation" :key="item.name" :to="item.to" class="text-sm leading-6 tracking-wide text-white relative">
          <span>{{ item.name }}</span>
          <div class="menu-highlight opacity-0"></div>
        </NuxtLink>
      </div>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-x-6 items-center">
        <HeadlessMenu as="div" class="relative text-left">
          <div class="inline-flex items-center justify-center">
            <HeadlessMenuButton
              class="h-8 w-8 inline-flex items-center justify-center bg-gray-500/20 border-gray-400/10 rounded-md bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              <Icon aria-hidden="true"
                    class="h-5 w-5 text-violet-200 hover:text-violet-100"
                    name="heroicons:moon"
              />
            </HeadlessMenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <headlessMenuItems
              class="absolute left-1/2 top-full mt-3 -translate-x-1/2 mt-2 w-44 divide-y divide-gray-100 rounded-md bg-gray-900 border border-gray-300/10 shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
              <div class="p-2 space-y-2">
                <HeadlessMenuItem v-slot="{ active }">
                  <div class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-600/10">
                    <button
                      class="h-8 w-8 inline-flex items-center justify-center bg-gray-500/20 border-gray-400/10 rounded-md bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      <Icon
                        aria-hidden="true"
                        class="h-5 w-5 text-violet-200 hover:text-violet-100"
                        name="heroicons:moon"
                      />
                    </button>
                    <span class="cursor-pointer">Dark Mode</span>
                  </div>
                </HeadlessMenuItem>
                <HeadlessMenuItem v-slot="{ active }">
                  <div class="flex items-center gap-3 p-2 rounded-md hover:bg-gray-600/10">
                    <button
                      class="h-8 w-8 inline-flex items-center justify-center bg-gray-500/20 border-gray-400/10 rounded-md bg-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                    >
                      <Icon aria-hidden="true"
                            class="h-5 w-5 text-violet-200 hover:text-violet-100"
                            name="heroicons:sun"
                      />
                    </button>
                    <span class="cursor-pointer">Light Mode</span>
                  </div>
                </HeadlessMenuItem>
              </div>
            </headlessMenuItems>
          </transition>
        </HeadlessMenu>
        <a class="text-gray-300 hover:text-gray-500 transition-all" href="https://github.com/anuzpandey/nepali-date-picker/" target="_blank">
          <span class="sr-only">Github</span>
          <Icon aria-hidden="true" class="h-7 w-7" name="uil:github"/>
        </a>
      </div>
    </nav>
    <HeadlessDialog :open="mobileMenuOpen" as="div" @close="mobileMenuOpen = false">
      <HeadlessDialogPanel class="fixed inset-0 z-10 overflow-y-auto bg-gray-900 px-6 py-6 lg:hidden" focus="true">
        <div class="flex items-center justify-between">
          <a class="-m-1.5 p-1.5" href="#">
            <span class="sr-only">Your Company</span>
            <img alt="" class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"/>
          </a>
          <button class="-m-2.5 rounded-md p-2.5 text-gray-400" type="button" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <Icon aria-hidden="true" class="h-6 w-6" name="heroicons:x-mark"/>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-white hover:bg-gray-400/10">{{ item.name }}</a>
            </div>
            <div class="py-6">
              <a class="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-white hover:bg-gray-400/10" href="#">Log in</a>
            </div>
          </div>
        </div>
      </HeadlessDialogPanel>
    </HeadlessDialog>
  </div>
</template>
