<template>
  <ManageBaseLayout>
    <template #left>
      <!-- 後台左側內容 -->
    </template>
    <template #center>
      <MapView />
    </template>
    <template #right>
      <!-- 可選的右側內容 -->
    </template>
  </ManageBaseLayout>
</template>

<script setup>
import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
import MapView from '@/components/MapView.vue'
</script>