<template>
  <div class="flex flex-col h-screen w-full bg-gray-100">
    <ManageHeader :toggleSidebar="toggleSidebar" />
    <ManageSidebar
      :isOpen="isSidebarOpen"
      :closeSidebar="closeSidebar"
    />
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/50 z-30"
      @click="isSidebarOpen = false"
    ></div>

    <main class="pt-14 flex justify-center flex-1 overflow-hidden">
      <aside class="hidden md:flex md:w-1/4 lg:w-1/5 bg-gray-200 flex-shrink-0 h-[calc(100vh - 56px)] overflow-y-auto">
        <slot name="left"></slot>
      </aside>

      <section class="flex-1 bg-white h-full p-4 overflow-y-auto">
        <slot name="center"></slot>
      </section>

      <aside class="hidden lg:flex lg:w-1/5 bg-gray-200 h-full overflow-y-auto">
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