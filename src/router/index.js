import { createRouter, createWebHistory } from 'vue-router'
import BuscadorPelis from '@/components/BuscadorPelis.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'buscador',
      component: BuscadorPelis,
    },
  ],
})

export default router