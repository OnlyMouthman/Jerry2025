let arcgisLoading = false
let arcgisLoaded = false

export function loadArcGIS() {
  return new Promise((resolve, reject) => {
    if (arcgisLoaded) return resolve()

    if (!arcgisLoading) {
      arcgisLoading = true

      const script = document.createElement('script')
      script.src = 'https://js.arcgis.com/4.29/'
      script.onload = () => {
        arcgisLoaded = true
        resolve()
      }
      script.onerror = reject

      document.head.appendChild(script)

      // 同時加載 CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://js.arcgis.com/4.29/esri/themes/light/main.css'
      document.head.appendChild(link)
    }
  })
}
