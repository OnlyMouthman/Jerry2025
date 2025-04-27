<template>
    <ManageBaseLayout>
      <template #left>
        <!-- 左側內容（可留空） -->
      </template>
  
      <template #center>
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">系統設定</h1>
          <p class="text-gray-600">這裡是系統設定頁面。</p>
        </div>
      </template>
  
      <template #right>
        <!-- 右側內容（可留空） -->
      </template>
    </ManageBaseLayout>
  </template>
  
  <script setup>
  import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
  </script>