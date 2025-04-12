<template>
  <header class="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-4">
    <!-- 左側按鈕（開啟 Sidebar） -->
    <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-200">
      <i class="material-icons text-2xl">menu</i>
    </button>

    <!-- 標題 -->
    <h1 class="text-lg font-semibold">My App</h1>

    <!-- 右側功能 -->
    <div>
      <button
        v-if="!userStore.user"
        @click="handleClick"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ $t('login') }}
      </button>
      <UserMenu v-else />
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { auth, provider, signInWithPopup } from '@/firebase'
import UserMenu from './UserMenu.vue'

defineProps({
  toggleSidebar: Function
})

const userStore = useUserStore()
const router = useRouter()

const handleClick = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    userStore.user = result.user
    // 不跳轉也可，或保留 router.push('/') 視需求
  } catch (error) {
    console.error('登入失敗', error)
  }
}
</script>
