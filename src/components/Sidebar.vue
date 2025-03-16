<template>
  <div>
    <!-- 遮罩（只有當 Sidebar 開啟時顯示）-->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-4 flex justify-between items-center">
        <h2 class="text-lg font-semibold">Sidebar</h2>
        <button @click="closeSidebar" class="p-2 rounded-lg hover:bg-gray-200">
          <i class="material-icons text-2xl">close</i>
        </button>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    closeSidebar: Function,
  },
};
</script>
