<template>
  <header class="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-4">
    <!-- 左側按鈕（開啟 Sidebar） -->
    <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-200">
      <i class="material-icons text-2xl">menu</i>
    </button>

    <!-- 標題 -->
    <h1 class="text-lg font-semibold">管理後台</h1>

    <!-- 右側功能 -->
    <div>
      <UserMenu v-if="userStore.user" />
      <button
        v-else
        @click="handleClick"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        使用 Google 登入
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { auth, provider, signInWithPopup } from '@/firebase'
import UserMenu from '../components/UserMenu.vue'

defineProps({
  toggleSidebar: Function
})

const userStore = useUserStore()
const router = useRouter()

const handleClick = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    userStore.user = result.user
    // 可視情況保留 router.push('/') 或 stay on /manage
  } catch (error) {
    console.error('登入失敗', error)
  }
}
</script>
