<template>
    <div ref="mapContainer" class="w-full h-full"></div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { loadArcGIS } from '@/utils/loadArcGIS'

const mapContainer = ref(null)

onMounted(async () => {
  await loadArcGIS()

  require(['esri/Map', 'esri/views/MapView'], (Map, MapView) => {
    const map = new Map({ basemap: 'topo-vector' })
    new MapView({
      container: mapContainer.value,
      map: map,
      center: [120.9842, 24.8039],
      zoom: 7
    })
  })
})
</script>

