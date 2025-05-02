import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false, // Client-side rendering only
  css: [
    '@/assets/css/main.css',
  ],
  modules: [
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  devtools: { enabled: true },
  vite: {
    plugins: [ tailwindcss() ],
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    },
  }
})