import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankView from '../views/BlankView.vue'
import MainView from '../views/MainView.vue'
import UploadView from '../views/UploadView.vue'
import UploadCODSection from '../views/UploadCODSection.vue'
import CodView from '../views/CodView.vue'
import Store from '@/store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/blankPage',
    name: 'blank',
    component: BlankView,
  },
  {
    path: '/cod',
    name: 'cod',
    component: CodView,
  },
  {
    path: '/codUpload',
    name: 'cod-up',
    component: UploadCODSection,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: UploadCODSection,
  },
  {
    path: '/LeTueFoto',
    name: 'LeTueFoto',
    component: MainView,
  },
  {
    path: '/upload',
    name: 'upload',
    component: UploadView
  },
  {
    path: '/all',
    name: 'all',
    component: MainView
  },
  {
    path: '/public',
    name: 'public',
    component: MainView
  },
]

const router = createRouter({
  history: createWebHistory('/my_site/myCloud/'),
  routes
})

router.beforeEach((to, from, next) => {
  // Aggiorna il componente dinamico nello store prima di ogni navigazione
  Store.commit('incrementComponentKey');
  next();
});

export default router
