<template>
    <BaseLayout>
      <template #left>
        <p>這是 AboutPage 的左側內容</p>
      </template>
  
      <p>這是 AboutPage 的主要內容</p>
  
      <template #right>
        <p>這是 AboutPage 的右側內容</p>
      </template>
    </BaseLayout>
  </template>
  
  <script>
  import BaseLayout from "../components/BaseLayout.vue";
  
  export default {
    components: { BaseLayout },
  };
  </script>