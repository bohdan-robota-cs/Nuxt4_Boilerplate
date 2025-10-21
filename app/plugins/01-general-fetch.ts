import { TOKEN_STORAGE_KEY } from '~/constants/token';

export default defineNuxtPlugin({
  name: 'fetchGeneral',
  setup(nuxtApp) {
    const { $toast } = useNuxtApp();
    const config = useRuntimeConfig();
    const BASE_URL = config.public.API_URL;

    const fetchGeneral = $fetch.create({
      baseURL: BASE_URL,
      retry: false,
      onRequest({ options }) {
        options.headers.append('Accept', 'applications/json');

        if (import.meta.browser) {
          const token = localStorage.getItem(TOKEN_STORAGE_KEY);

          if (token) {
            options.headers.append('Authorization', `Bearer ${token}`);
          }
        }
      },
      async onResponseError({ response }) {
        if (response.status == 401) {
          nuxtApp.runWithContext(() => navigateTo('/auth'));
          $toast.error('Sorry your session has ended, please log in again and continue working.');
        }
        if (response.status === 403) {
          $toast.error('Permission denied');
        }
        if (response.status == 429) {
          $toast.error('We received too many requests from your device. Please try again later');
        }
      },
    });
    return {
      provide: {
        fetchGeneral,
      },
    };
  },
});
