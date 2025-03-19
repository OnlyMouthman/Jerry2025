<template>
    <div class="flex flex-col h-screen w-full bg-gray-100">
      <!-- Header -->
      <Header :toggleSidebar="toggleSidebar" />
  
      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" :closeSidebar="closeSidebar" />
  
      <!-- Main Content -->
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
  
  <script>
  import { ref } from "vue";
  import Header from "./Header.vue";
  import Sidebar from "./Sidebar.vue";
  
  export default {
    components: { Header, Sidebar },
    setup() {
      const isSidebarOpen = ref(false);
  
      const toggleSidebar = () => {
        isSidebarOpen.value = !isSidebarOpen.value;
      };
  
      const closeSidebar = () => {
        isSidebarOpen.value = false;
      };
  
      return { isSidebarOpen, toggleSidebar, closeSidebar };
    },
  };
  </script>