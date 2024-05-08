import 'material-symbols';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).mount('#app');
