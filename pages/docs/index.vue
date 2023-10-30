<script lang="ts" setup>
import BgGrid from "~/components/Svg/BgGrid.vue"
import DocSideBarNavigation from "~/components/DocSideBarNavigation.vue"
import DocAsideLinks from "~/components/DocAsideLinks.vue"
</script>

<template>
  <section class="relative page-container py-14">
    <BgGrid addition-classes="opacity-30"/>

    <h1 class="text-white text-2xl">Documentation</h1>

    <div class="relative flex w-full flex-auto justify-center">
      <DocSideBarNavigation/>

      <div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <header class="mb-9 space-y-1">
            <p class="font-display text-sm font-medium text-sky-500">Introduction</p>
            <h1 class="font-display text-3xl tracking-tight text-white">Getting started</h1>
          </header>
          <div
            class="prose max-w-none prose-invert"
          >
            <p class="lead">Learn how to get NepaliDatePicker set up in your project in under two minutes.</p>
            <p>Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste.</p>
            <hr/>
            <h2 id="quick-start">Quick start</h2>
            <p>Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur.</p>
            <h3 id="installing-dependencies">Installing dependencies</h3>
            <p>
              Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia
              necessitatibus.
            </p>
          </div>
        </article>

        <dl class="mt-12 flex border-t pt-6 border-slate-800">
          <div class="ml-auto text-right">
            <dt class="font-display text-sm font-medium text-white">Next</dt>
            <dd class="mt-1">
              <a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="/docs/installation">
                Installation
                <svg aria-hidden="true" class="h-4 w-4 flex-none fill-current" viewBox="0 0 16 16">
                  <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
                </svg>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <DocAsideLinks/>
    </div>
  </section>
</template>

<style scoped>

</style>