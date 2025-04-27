<template>
    <div v-if="visible" :class="[
        'fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl shadow-xl animate-fadeIn',
        colorClass,
    ]">
        {{ message }}
    </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
const message = ref("");
const colorClass = ref("bg-black/80 text-white");

function show(msg, type = "success") {
    message.value = msg;
    visible.value = true;
    colorClass.value =
        type === "error" ? "bg-red-600 text-white" : "bg-black/80 text-white";
    setTimeout(() => {
        visible.value = false;
    }, 3000);
}

defineExpose({ show });
</script>
