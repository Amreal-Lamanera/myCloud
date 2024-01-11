import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    metaInfo: {
      title: 'iPiera Cloud - Homepage'
    }
  },
  {
    path: '/upload',
    name: 'upload',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UploadView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Controlla se la pagina sta usando HTTPS in un ambiente di produzione
  if (window.location.protocol === 'http:' && process.env.NODE_ENV === 'production') {
    // Forza il reindirizzamento a HTTPS
    next({
      path: to.path,
      query: to.query,
      hash: to.hash,
      protocol: 'https:',
      host: window.location.host,
    });
  } else {
    // Continua la navigazione normale
    next();
  }
});

export default router
