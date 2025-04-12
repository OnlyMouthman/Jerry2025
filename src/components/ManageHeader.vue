<template>
  <header class="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-4">
    <!-- 左側按鈕（開啟 Sidebar） -->
    <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-200">
      <i class="material-icons text-2xl">menu</i>
    </button>

    <!-- 標題 -->
    <h1 class="text-lg font-semibold">My App</h1>

    <!-- 使用者功能選單 -->
    <UserMenu v-if="user" />
  </header>
</template>

<script setup>
defineProps(["toggleSidebar"])
const user = ref(null)

import { ref, defineProps } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserMenu from './UserMenu.vue'


