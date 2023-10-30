// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: [
        '@nuxt/content',
        '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss',
        'nuxt-headlessui',
        'nuxt-icon'
    ],

    content: {
        // ... options
    },

    app: {
        head: {
            bodyAttrs: {
                class: 'bg-gray-900 text-white'
            }
        }
    }
})
