<template>
 <div class="flex flex-col h-screen w-full bg-gray-100">
    <Header :toggleSidebar="toggleSidebar" />
    <Sidebar
      :isOpen="isSidebarOpen"
      :closeSidebar="closeSidebar"
      @showLang="openLangModal"
    />
    <LanguageModal ref="langModal" />

    <main class="pt-14 flex items-center justify-center flex-1">
        <!-- 左側區塊 -->
        <aside class="hidden md:flex md:w-1/3 lg:w-1/5 bg-gray-200 p-4 h-full">
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
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import LanguageModal from '@/components/LanguageModal.vue'

const isSidebarOpen = ref(false)
const langModal = ref(null)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const closeSidebar = () => {
  isSidebarOpen.value = false
}

const openLangModal = () => {
  langModal.value?.open()
}
</script>
