<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'App',
  setup() {
    const userStore = useUserStore()

    onMounted(() => {
      userStore.init()
    })
  }
}
</script>
