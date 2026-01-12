import ListUsers from '@/modules/samples/pages/admin/ListUsers.vue'
import HomePage from '@/modules/samples/pages/HomePage.vue'
import ListComponent from '@/modules/samples/pages/myComponents/ListComponent.vue'
import SearchComponent from '@/modules/samples/pages/myComponents/SearchComponent.vue'
import ShowComponent from '@/modules/samples/pages/myComponents/ShowComponent.vue'
import ListReviews from '@/modules/samples/pages/personalReviews/ListReviews.vue'
import AppLayout from '@/shared/layouts/AppLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        component: HomePage,
      },
      {
        path: 'components',
        component: ListComponent,
        meta: { title: "Componentes cadastrados | TechComponenents"}
      },
      {
        path: 'my-reviews',
        component: ListReviews,
        meta: { requiresAuth: true, title: "Minhas Reviews | TechComponenents" }
      },
      {
        path: 'users',
        component: ListUsers,
        meta: { requiresAdmin: true, title: "Usuários Cadastrados | TechComponenents" }
      },
      {
        path: 'show-component/:id',
        component: ShowComponent,
      },
      {
        path: 'search-components-by-name/:name',
        component: SearchComponent,
      },
      // not registrated routes will redirect to homepage
      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
    ],
  },
]
