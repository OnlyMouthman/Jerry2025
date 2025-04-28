import { defineStore } from 'pinia'
import { auth } from '@/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { buildUserProfile } from '@/api/user'

const PROFILE_KEY = 'userProfile'   // 本地快取的key名稱

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    uid: '',
    name: '',
    email: '',
    role: '',
    permissions: []
  }),
  actions: {
    init() {
      // 先讀取 localStorage 快取
      const cachedProfile = localStorage.getItem(PROFILE_KEY)
      if (cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile)
          this.setUser(profile)
          console.log('從localStorage載入使用者資料')
        } catch (e) {
          console.error('載入localStorage資料失敗', e)
        }
      }

      // 再監聽 Firebase 認證狀態
      onAuthStateChanged(auth, async (user) => {
        this.user = user

        if (user) {
          try {
            const fullProfile = await buildUserProfile(user)
            this.setUser({
              uid: user.uid,
              name: fullProfile.name,
              email: fullProfile.email,
              role: fullProfile.role,
              permissions: fullProfile.permissions || []
            })
            localStorage.setItem(PROFILE_KEY, JSON.stringify({
              uid: user.uid,
              name: fullProfile.name,
              email: fullProfile.email,
              role: fullProfile.role,
              permissions: fullProfile.permissions || []
            }))
          } catch (error) {
            console.error('初始化同步使用者資料失敗', error)
            this.clearUser()
          }
        } else {
          this.clearUser()
        }
      })
    },
    async logout() {
      try {
        await signOut(auth)
      } catch (error) {
        console.error('登出失敗', error)
      }
      this.clearUser()
    },
    setUser(userData) {
      this.uid = userData.uid
      this.name = userData.name
      this.email = userData.email
      this.role = userData.role
      this.permissions = userData.permissions || []
    },
    clearUser() {
      this.authUser = null
      this.uid = ''
      this.name = ''
      this.email = ''
      this.role = ''
      this.permissions = []
      localStorage.removeItem(PROFILE_KEY)  // 🔥 登出時也清除快取
    }
  }
})
