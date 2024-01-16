import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Store from './store'
import './assets/css/tailwind.css'
import LoadingComponent from '@/components/LoadingComponent';
import MainNav from '@/components/MainNav.vue';
import MainFooter from '@/components/MainFooter';
import ErrorComponent from '@/components/ErrorComponent';

const app = createApp(App);

app.component('LoadingComponent', LoadingComponent);
app.component('MainNav', MainNav);
app.component('MainFooter', MainFooter);
app.component('ErrorComponent', ErrorComponent);
app.use(Store).use(router);

router.isReady().then(() => {
    app.mount('#app');
});
