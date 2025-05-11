<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

let map = null

onMounted(() => {
  // 初始化地圖
  map = L.map('map').setView([23.6978, 120.9605], 8)  // 台灣中心點

  // 加入 OpenStreetMap 底圖
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  // 範例：加入一個 Marker（台北101）
  const marker = L.marker([25.033964, 121.564468]).addTo(map)
  marker.bindPopup('<b>台北 101</b><br>範例標記').openPopup()

  // 範例：點擊地圖事件
  map.on('click', (e) => {
    console.log(`點擊位置：${e.latlng.lat}, ${e.latlng.lng}`)
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
      .bindPopup('你剛剛點了這裡！').openPopup()
  })
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
  }
})
</script>

