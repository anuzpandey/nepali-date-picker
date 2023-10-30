<script lang="ts" setup>
const navigationItems = [
  {
    title: "Introduction",
    links: [
      {title: "Getting started", to: "docs", routeName: "docs"},
      {title: "Installation", to: "docs/installation", routeName: "docs-installation"},
      {title: "Usage", to: "docs/usage", routeName: "docs-usage"}
    ]
  },
  {
    title: "Examples",
    links: [
      {title: "Basic", to: "docs/examples/basics", routeName: "docs-examples-basics"},
      {title: "minDate & maxDate", to: "docs/examples/min-max-date", routeName: "docs-examples-min-max-date"},
      {title: "Disabling Dates", to: "docs/examples/disabling-dates", routeName: "docs-examples-disabling-dates"},
    ]
  },
  {
    title: "NepaliDatePicker Instance",
    links: [
      {title: "Retrieve Instance", to: "docs/instance/retrieve-instance", routeName: "docs-instance-retrieve-instance"},
      {title: "Properties", to: "docs/instance/properties", routeName: "docs-instance-properties"},
      {title: "Methods", to: "docs/instance/methods", routeName: "docs-instance-methods"},
      {title: "Useful Static Methods", to: "docs/instance/useful-static-methods", routeName: "docs-instance-useful-static-methods"},
    ]
  },
  {
    title: "Config Options",
    links: [
      {title: "Configs", to: "docs/configs", routeName: "docs-configs"},
    ]
  },
  {
    title: "Themes",
    links: [
      {title: "Theme Options", to: "docs/themes/theme-options", routeName: "docs-themes-theme-options"},
    ]
  }
]

const route = useRoute()
</script>

<template>
  <div class="hidden lg:relative lg:block lg:flex-none">
    <div class="absolute bottom-0 right-0 top-16 h-12 w-px bg-gradient-to-t from-slate-800 block"></div>
    <div class="absolute bottom-0 right-0 top-28 w-px bg-slate-800 block"></div>
    <div class="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
      <nav class="text-base lg:text-sm">
        <ul class="space-y-9" role="list">
          <li v-for="(navItem, navItemIndex) in navigationItems" :key="navItemIndex">
            <h2 class="font-display font-medium text-white">{{ navItem.title }}</h2>
            <ul class="mt-2 space-y-2 border-l-2 border-gray-800 lg:mt-4 lg:space-y-4" role="list">
              <li v-for="(link, linkIndex) in navItem.links" class="relative">
                <NuxtLink :class="`link-list ${route.name === link.routeName ? 'active' : 'in-active'}`" :to="link.to">
                  {{ link.title }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>

</style>