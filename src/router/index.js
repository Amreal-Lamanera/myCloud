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
  },
  {
    path: '/all/:superuser',
    name: 'all',
    props: (route) => ({ superuser: route.params.superuser }),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView
  },
  {
    path: '/public/:forAll',
    name: 'public',
    props: (route) => ({ forAll: route.params.forAll }),
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView
  },
]

const router = createRouter({
  history: createWebHistory('/my_site/admin/c-panel/myCloud/'),
  routes
})

// router.beforeEach((to, from, next) => {
//   // Controlla se la pagina sta usando HTTPS in un ambiente di produzione
//   if (window.location.protocol === 'http:' && process.env.NODE_ENV === 'production') {
//     // Forza il reindirizzamento a HTTPS
//     next({
//       path: to.path,
//       query: to.query,
//       hash: to.hash,
//       protocol: 'https:',
//       host: window.location.host,
//     });
//   } else {
//     // Continua la navigazione normale
//     next();
//   }
// });

export default router
