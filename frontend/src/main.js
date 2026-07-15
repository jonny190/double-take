import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Lara from '@primevue/themes/lara';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import App from '@/App.vue';
import router from '@/router';
import emitter from '@/services/emitter.service';

const app = createApp(App)
  .use(router)
  .use(PrimeVue, {
    // PrimeVue 4 styled mode: Lara preset (closest to the legacy look).
    // Dark mode is toggled by adding the `.dark` class to <html>.
    theme: {
      preset: Lara,
      options: {
        darkModeSelector: '.dark',
        cssLayer: false,
      },
    },
    ripple: true,
  })
  .use(ConfirmationService)
  .use(ToastService)
  .directive('tooltip', Tooltip);

app.config.globalProperties.emitter = emitter;
app.mount('#app');
