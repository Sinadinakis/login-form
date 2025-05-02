import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    modules: [
        '@nuxt/test-utils/module',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@nuxt/test-utils/module',
        '@nuxt/eslint',
    ],
    ssr: false, devtools: { enabled: true },
    // Client-side rendering only
    css: [
        '@/assets/css/main.css',
    ],
    compatibilityDate: '2024-11-01',
    vite: {
        plugins: [tailwindcss()],
        vue: {
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag.includes('-'),
                },
            },
        },
    },
    pinia: {
        storesDirs: ['./stores/**', './custom-folder/stores/**'],
    },
});
