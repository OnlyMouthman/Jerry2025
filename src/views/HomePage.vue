<template>
  <BaseLayout>
    <template #left>
      <p>左側內容</p>
    </template>

    <template #center>
      <MapView />
    </template>

    <template #right>
      <p>右側內容</p>
    </template>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
import MapView from '@/components/MapView.vue'
</script>
