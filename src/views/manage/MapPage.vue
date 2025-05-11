<template>
  <ManageBaseLayout>
    <template #left>
      <ProjectSidebar @open-dialog="isDialogOpen = true" />
    </template>

    <template #center>
      <MapView />
    </template>

    <template #right>
      <!-- 右側內容 -->
    </template>
  </ManageBaseLayout>

</template>

<script setup>
import { ref } from 'vue'
import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
import MapView from '@/components/MapView.vue'
import ProjectSidebar from '@/components/ProjectSidebar.vue'  // ⬅️ 引入新元件


</script>