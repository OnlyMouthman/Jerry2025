<template>
  <div class="relative flex items-center space-x-3" ref="menuContainer">
    <!-- 左側按鈕：{{ $t('goToManage') }} / {{ $t('goToFrontend') }} -->
    <button
      @click="goToOtherPage"
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      {{ currentPath === '/' ? $t('goToManage') : $t('goToFrontend') }}
    </button>

    <!-- 使用者頭像 + 下拉選單 -->
    <div class="relative">
      <img
        :src="userStore.user?.photoURL"
        alt="User"
        class="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
        @click="toggleDropdown"
      />
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50"
      >
        <ul class="text-sm">
          <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">{{ $t('feature1') }}</li>
          <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">{{ $t('feature2') }}</li>
          <li
            class="hover:bg-gray-100 px-4 py-2 cursor-pointer text-red-500"
            @click="logout"
          >
            {{ $t('logout') }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const currentPath = route.path
const dropdownOpen = ref(false)
const menuContainer = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const logout = async () => {
  await userStore.logout()
  router.push('/') // {{ $t('logout') }}後回首頁，自動重新渲染狀態
}

const goToOtherPage = () => {
  const target = currentPath === '/' ? '/manage' : '/'
  router.push(target)
}

// 點擊外部關閉 dropdown
const handleClickOutside = (event) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
