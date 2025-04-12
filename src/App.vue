<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>


import { ref, defineProps } from 'vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

</script>
