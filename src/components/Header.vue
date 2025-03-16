<template>
  <header class="fixed top-0 left-0 w-full h-14 bg-white shadow-md flex items-center px-4">
    <button @click="toggleSidebar" class="p-2 rounded-lg hover:bg-gray-200">
      <i class="material-icons text-2xl">menu</i>
    </button>
    <h1 class="ml-4 text-lg font-semibold">My App</h1>
  </header>
</template>

<script>
export default {
  props: {
    toggleSidebar: Function,
  },
};
</script>
