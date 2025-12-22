import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuth } from '@/modules/samples/composables/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const { isAuthenticatedValue } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticatedValue.value) {
    return {
      path: '/',
      state: { redirect: to.fullPath}
    }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title as string || 'Os melhores componentes tech e ofertas | TechComponenents'
})

export default router
