<template>
  <ManageBaseLayout>
    <template #left>
      <LeftControlPanel @open-dialog="isDialogOpen = true" />
    </template>

    <template #center>
      <MapView />
    </template>

    <template #right>
      <RightControlPanel />
    </template>
  </ManageBaseLayout>

</template>

<script setup>
import { ref } from 'vue'
import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
import MapView from '@/components/MapView.vue'
import LeftControlPanel from '@/components/LeftControlPanel.vue' 
import RightControlPanel from '@/components/RightControlPanel.vue'

</script>