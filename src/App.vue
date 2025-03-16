
<template>
  <div class="relative h-screen w-screen bg-gray-100">
    <!-- Header -->
    <Header :toggleSidebar="toggleSidebar" />

    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" :closeSidebar="closeSidebar" />

    <!-- Main Content -->
    <main class="flex items-center justify-center h-[calc(100vh-56px)]">
      <p class="text-center text-lg font-semibold">Content goes here...</p>
    </main>
  </div>
</template>



<script>
import { ref, onMounted, onUnmounted } from "vue";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    onMounted(() => {
      window.addEventListener("keydown", handleEscape);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleEscape);
    });

    return {
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    };
  },
};
</script>