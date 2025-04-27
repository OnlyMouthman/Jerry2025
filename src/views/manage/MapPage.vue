<template>
    <ManageBaseLayout>
      <template #left>
        <!-- 左側內容（可留空） -->
      </template>
  
      <template #center>
        <div class="p-4">
          <h1 class="text-2xl font-bold mb-4">地圖設定</h1>
          <p class="text-gray-600">這裡是地圖設定頁面。</p>
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