<template>
  <BaseLayout>
    <main class="flex items-center justify-center h-full">
      <!-- 左側 -->
      <aside class="hidden md:flex md:w-1/4 lg:w-1/5 bg-gray-200 p-4 h-full">
        <p>左側內容</p>
      </aside>

      <!-- 中間 -->
      <section class="flex-1 bg-white p-4 h-full">
        <p>中間主要內容</p>
      </section>

      <!-- 右側 -->
      <aside class="hidden md:flex md:w-1/4 lg:w-1/5 bg-gray-200 p-4 h-full">
        <p>右側內容</p>
      </aside>
    </main>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from '@/layouts/BaseLayout.vue'
</script>
