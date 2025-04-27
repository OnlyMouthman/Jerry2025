import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ManagePage from '@/views/ManagePage.vue'
import UsersListPage from '@/views/manage/users/UsersListPage.vue'
import UsersRolesPage from '@/views/manage/users/UsersRolesPage.vue'
import PostsPage from '@/views/manage/PostsPage.vue'
import MapPage from '@/views/manage/MapPage.vue'
import SettingsPage from '@/views/manage/SettingsPage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  {
    path: '/manage',
    component: ManagePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/users/list',
    component: UsersListPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/users/roles',
    component: UsersRolesPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/posts',
    component: PostsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/map',
    component: MapPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/settings',
    component: SettingsPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ 路由守衛（驗證登入）
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const auth = getAuth()

  if (!requiresAuth) {
    next()
    return
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  })
})

export default router