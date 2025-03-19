<template>
  <BaseLayout>
    <template #left>
      <p>左側內容</p>
    </template>

    <template #center>
      <p>這是 HomePage 的主要內容</p>
    </template>

    <template #right>
      <p>右側內容</p>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "../components/BaseLayout.vue";

export default {
  components: { BaseLayout },
};
</script>