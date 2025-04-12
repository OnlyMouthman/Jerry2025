import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ManagePage from '@/views/ManagePage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const routes = [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage }, // ✅ 加這行
    {
      path: '/manage',
      component: ManagePage,
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
          query: { redirect: to.fullPath } // ✅ 加上 redirect 資訊
        })
      }
    })
  })

export default router