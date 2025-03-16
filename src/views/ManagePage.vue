<template>
    <div class="relative h-screen w-screen bg-gray-100">
      <ManageHeader :toggleSidebar="toggleSidebar" />
      <ManageSidebar :isOpen="isSidebarOpen" :closeSidebar="closeSidebar" />
  
      <main class="pt-14 flex items-center justify-center h-[calc(100vh-56px)]">
        <p class="text-center text-lg font-semibold">Manage Page Content</p>
      </main>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import ManageHeader from "../components/ManageHeader.vue";
  import ManageSidebar from "../components/ManageSidebar.vue";
  
  export default {
    components: { ManageHeader, ManageSidebar },
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