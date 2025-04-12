<template>
  <aside
    :class="[
      'fixed top-14 left-0 w-64 h-[calc(100vh-56px)] bg-white shadow-md transform transition-transform duration-300 z-40',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <ul class="divide-y divide-gray-200">
      <li class="hover:bg-gray-200 px-4 py-2 cursor-pointer">
        管理項目 1
      </li>
      <li class="hover:bg-gray-200 px-4 py-2 cursor-pointer">
        管理項目 2
      </li>
      <!-- 語言切換 -->
      <li class="hover:bg-gray-200 px-4 py-2 cursor-pointer" @click="$emit('showLang')">
        {{ $t('language') }}
      </li>
    </ul>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  closeSidebar: Function
})
</script>
