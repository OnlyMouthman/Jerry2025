<template>
    <div class="flex flex-col h-screen w-full bg-gray-100">
      <ManageHeader :toggleSidebar="toggleSidebar" />
      <ManageSidebar
        :isOpen="isSidebarOpen"
        :closeSidebar="closeSidebar"
      />
      <!-- 🔳 黑色遮罩 -->
      <div
        v-if="isSidebarOpen"
        class="fixed inset-0 bg-black/50 z-30"
        @click="isSidebarOpen = false"
      ></div>
  
      <main class="pt-14 flex items-center justify-center flex-1">
        <!-- 左側區塊 -->
        <aside class="hidden md:flex md:w-1/4 lg:w-1/5 bg-gray-200 p-4 h-full">
          <slot name="left"></slot>
        </aside>
  
        <!-- 中間主要內容區塊 -->
        <section class="flex-1 bg-white p-4 h-full">
          <slot name="center"></slot>
        </section>
  
        <!-- 右側區塊 -->
        <aside class="hidden lg:flex lg:w-1/5 bg-gray-200 p-4 h-full">
          <slot name="right"></slot>
        </aside>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import ManageHeader from '@/components/ManageHeader.vue'
  import ManageSidebar from '@/components/ManageSidebar.vue'
  
  const isSidebarOpen = ref(false)
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  const closeSidebar = () => {
    isSidebarOpen.value = false
  }
  </script>