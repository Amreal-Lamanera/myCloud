import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlankView from '../views/BlankView.vue'
import MainView from '../views/MainView.vue'
import UploadView from '../views/UploadView.vue'

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

export default router
