<template>
  <aside :class="[
    'fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white shadow-md transform transition-transform duration-300 z-40',
    isOpen ? 'translate-x-0' : '-translate-x-full',
  ]">
    <ul class="flex flex-col p-4 space-y-2 text-left">
      <!-- 總覽 -->
      <li v-if="hasPermission('overview_manage')">
        <RouterLink to="/manage" class="block py-2 px-3 rounded hover:bg-gray-200 transition"
          :class="{ 'bg-gray-100 font-bold': route.path === '/manage' }" @click="handleClick">
          總覽
        </RouterLink>
      </li>

      <!-- 使用者與權限 分組 -->
      <li v-if="hasPermission('user_manage') || hasPermission('user:roles')">
        <button class="block w-full py-2 px-3 rounded hover:bg-gray-200 transition flex justify-between items-center"
          @click="toggleUserMenu">
          <span>使用者與權限</span>
          <span>{{ isUserMenuOpen ? "-" : "+" }}</span>
        </button>

        <transition name="slide-down">
          <ul v-show="isUserMenuOpen" class="ml-4 mt-2 space-y-2 overflow-hidden">
            <li>
              <RouterLink to="/manage/users/list" class="block py-2 px-3 rounded hover:bg-gray-200 transition" :class="{
                'bg-gray-100 font-bold':
                  route.path.startsWith('/manage/users/list'),
              }" @click="handleClick">
                使用者清單
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/manage/users/roles" class="block py-2 px-3 rounded hover:bg-gray-200 transition" :class="{
                'bg-gray-100 font-bold': route.path.startsWith(
                  '/manage/users/roles'
                ),
              }" @click="handleClick">
                身分權限管理
              </RouterLink>
            </li>
          </ul>
        </transition>
      </li>

      <!-- 文章管理 -->
      <li v-if="hasPermission('post_manage')">
        <RouterLink to="/manage/posts" class="block py-2 px-3 rounded hover:bg-gray-200 transition"
          :class="{ 'bg-gray-100 font-bold': route.path === '/manage/posts' }" @click="handleClick">
          文章管理
        </RouterLink>
      </li>

      <!-- 地圖設定 -->
      <li v-if="hasPermission('map_manage')">
        <RouterLink to="/manage/map" class="block py-2 px-3 rounded hover:bg-gray-200 transition"
          :class="{ 'bg-gray-100 font-bold': route.path === '/manage/map' }" @click="handleClick">
          地圖設定
        </RouterLink>
      </li>

      <!-- 系統設定 -->
      <li v-if="hasPermission('system_manage')">
        <RouterLink to="/manage/settings" class="block py-2 px-3 rounded hover:bg-gray-200 transition" :class="{
          'bg-gray-100 font-bold': route.path === '/manage/settings',
        }" @click="handleClick">
          系統設定
        </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  isOpen: Boolean,
  closeSidebar: Function,
});

const route = useRoute();
const userStore = useUserStore();

const isUserMenuOpen = ref(false);

// 點選後關閉 Sidebar
const handleClick = () => {
  props.closeSidebar?.();
};

// 切換 使用者與權限 子選單展開收合
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

// 預設根據路徑判斷是否展開子選單
watch(
  route,
  () => {
    if (route.path.startsWith("/manage/users/")) {
      isUserMenuOpen.value = true;
    }
  },
  { immediate: true }
);

// 權限判斷
const hasPermission = (permission) => {
  console.log(userStore.permissions)
  return userStore.permissions?.includes(permission);
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
