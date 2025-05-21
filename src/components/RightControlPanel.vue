<!-- RightControlPanel.vue -->
<template>
  <div class="p-4 space-y-4">
    <h2 class="font-bold text-lg">繪製圖徵</h2>
    <button @click="drawShape('marker')" class="btn">畫點</button>
    <button @click="drawShape('polyline')" class="btn">畫線</button>
    <button @click="drawShape('polygon')" class="btn">畫面</button>

    <div v-if="selectedFeature">
      <h3 class="mt-4 font-semibold">樣式編輯</h3>
      <label>背景顏色 <input type="color" v-model="fillColor" /></label>
      <label>框線顏色 <input type="color" v-model="strokeColor" /></label>
      <label>框線粗度 <input type="range" min="1" max="10" v-model="strokeWidth" /></label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useProjectStore } from '@/stores/projectStore'

const store = useProjectStore()

// 模擬屬性控制
const fillColor = ref('#3388ff')
const strokeColor = ref('#000000')
const strokeWidth = ref(3)

// 觸發 leaflet 繪圖
const drawShape = (type) => {
  window.dispatchEvent(new CustomEvent('start-draw', { detail: { type } }))
}

watch([fillColor, strokeColor, strokeWidth], () => {
  if (store.selectedFeature?.leafletLayer) {
    store.selectedFeature.leafletLayer.setStyle({
      fillColor: fillColor.value,
      color: strokeColor.value,
      weight: strokeWidth.value
    })
  }
})
</script>
