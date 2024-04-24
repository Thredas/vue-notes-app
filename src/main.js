import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue';
import commonComponents from '@/components/ui';

const app = createApp(App);
const pinia = createPinia();
commonComponents.forEach((component) =>
  app.component(component.name, component)
);

app.use(pinia).mount('#app');
