<template>
    <div class="relative h-screen w-screen bg-gray-100">
      <!-- Header -->
      <Header :toggleSidebar="toggleSidebar" />
      
      <!-- Sidebar -->
      <Sidebar :isOpen="isSidebarOpen" :closeSidebar="closeSidebar" />
  
      <!-- Main Content -->
      <main class="pt-14 flex items-center justify-center h-[calc(100vh-56px)]">
        <p class="text-center text-lg font-semibold">Home Page Content</p>
      </main>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import Header from "../components/Header.vue";
  import Sidebar from "../components/Sidebar.vue";
  
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