export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['shadcn-nuxt', '@nuxt/eslint', '@nuxt/fonts', 'vue-sonner/nuxt'],
  css: ['@/assets/css/main.css'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.NUXT_PUBLIC_API_URL,
      API_URL_ROOT: process.env.NUXT_PUBLIC_API_URL_ROOT,
      APP_DOMAIN: process.env.APP_DOMAIN,
      APP_PROTOCOL: process.env.APP_PROTOCOL,
    },
  },
});
