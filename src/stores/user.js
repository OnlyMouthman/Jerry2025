// src/stores/user.js
import { defineStore } from 'pinia'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    init() {
      const auth = getAuth()
      onAuthStateChanged(auth, (u) => {
        this.user = u
      })
    },
    async logout() {
      const auth = getAuth()
      await signOut(auth)
      this.user = null
    },
  },
})
