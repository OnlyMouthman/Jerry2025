<template>
    <header class="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center justify-between px-4">
      <!-- 左側按鈕（開啟 Sidebar） -->
      <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-200">
        <i class="material-icons text-2xl">menu</i>
      </button>
  
      <!-- 標題 -->
      <h1 class="text-lg font-semibold">My App</h1>
  
      <!-- 右側用戶頭像按鈕（跳轉到管理頁面 /manage） -->
      <button @click="goToManagePage" class="p-2 rounded-full hover:bg-gray-200">
        <img src="https://i.pravatar.cc/40" alt="User Avatar" class="w-10 h-10 rounded-full">
      </button>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      toggleSidebar: Function,
    },
    methods: {
      goToManagePage() {
        this.$router.push("/"); // 跳轉到 /manage
      },
    },
  };
  </script>
  