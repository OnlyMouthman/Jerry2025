<template> 
  <div id="map" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-draw'

import { createFeature, updateFeature } from '@/api/feature'
import { useProjectStore } from '@/stores/projectStore' 

let map = null
let drawnItems = null
let drawHandler = null

const projectStore = useProjectStore()

onMounted(() => {
  map = L.map('map').setView([23.6978, 120.9605], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // 初始化圖層容器
  drawnItems = new L.FeatureGroup()
  map.addLayer(drawnItems)

  // 監聽繪製完成事件
  map.on(L.Draw.Event.CREATED, async (e) => {
    const layer = e.layer
    drawnItems.addLayer(layer)

    const geojson = layer.toGeoJSON()
    const geometry = geojson.geometry

    // 自動產生名稱與類型
    const type = geometry.type.toLowerCase()
    const name = `${type} ${new Date().toISOString().slice(11, 19)}`

    // 寫入 Firebase
    if (projectStore.selectedProject && projectStore.selectedSubProject && projectStore.selectedFeature) {
      await updateFeature(projectStore.selectedFeature.id, { geometry })
    } else {
      console.warn('請先選擇子專案')
    }

    // 綁定到選中的圖層以便後續編輯
    projectStore.setFeature({ ...projectStore.selectedFeature, leafletLayer: layer })
  })

  // 🔁 監聽外部觸發繪圖事件
  window.addEventListener('start-draw', (e) => {
    if (!e.detail?.type) return

    // 停止舊的繪圖器
    if (drawHandler) {
      drawHandler.disable()
    }

    const type = e.detail.type
    const drawMap = {
      marker: L.Draw.Marker,
      polyline: L.Draw.Polyline,
      polygon: L.Draw.Polygon
    }

    const DrawClass = drawMap[type]
    if (!DrawClass) {
      console.warn('不支援的繪圖類型:', type)
      return
    }

    drawHandler = new DrawClass(map, {
      shapeOptions: {
        color: '#000000',
        weight: 3,
        fillColor: '#3388ff',
        fillOpacity: 0.5
      }
    })
    drawHandler.enable()
  })
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
#map {
  height: 100%;
}
</style>