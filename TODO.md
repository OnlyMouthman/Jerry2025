
# ✅ Jerry 專案任務清單

## 🧱 基礎架構與前端骨架

- [ ] 初始化 Vue 專案（Vite）
- [ ] 安裝 TailwindCSS 並設好 layout 結構（左中右三區）
- [ ] 設定 Vue Router，建立基本路由（首頁 `/`、管理 `/manage`）
- [ ] 建立 BaseLayout 結構（含 Header / Sidebar / Main）

## 🔐 使用者登入（管理用）

- [ ] 整合 Firebase Authentication（僅限 Google 登入）
- [ ] 建立使用者登入狀態元件（右上角 Avatar + dropdown）
- [ ] 登入後顯示「前往管理」、「登出」、「功能列」等選項
- [ ] 管理頁與前台頁面根據登入狀態判斷權限顯示

## 🌍 地圖元件（ArcGIS）

- [ ] 引入 ArcGIS JS API，建立基本地圖元件 `MapView.vue`
- [ ] 建立 Marker 顯示與點擊彈出資料卡片
- [ ] 支援依時間篩選與地圖自動聚焦

## 🕒 時間軸元件（Timeline）

- [ ] 建立左側垂直時間軸元件 `Timeline.vue`
- [ ] 資料支援世紀/年/月/日/時間格式顯示
- [ ] 點擊時間節點 → 更新地圖與右側內容

## 📄 詳情呈現區塊（右側）

- [ ] 建立 `DetailPanel.vue` 顯示單筆資料詳情（包含圖片、描述）
- [ ] 描述內容為 JSON，需依模組化內容解譯呈現
- [ ] 支援標籤、連結顯示與跳轉

## ✍️ 後台編輯器（類 Notion）

- [ ] 建立管理頁 `/manage` 與元件 `BlockEditor.vue`
- [ ] 選用類似 Editor.js 的模組化編輯器（支援圖片、段落、清單等）
- [ ] 加入地點選擇（ArcGIS 地圖點選）與時間選擇（日期 + 世紀）
- [ ] 可設定是否公開、儲存 JSON 結構至資料庫

## 🔄 API 封裝

- [ ] 建立 `/src/api/index.ts` 作為統一的 API 存取點
- [ ] 建立 fetch/post/update/delete 方法封裝 Firebase Firestore
- [ ] 封裝 Auth 用戶相關方法
- [ ] 預留切換到 Django 的轉接口（例如 `getRecords()` vs `axios.get(...)`）

## 💾 資料結構設計

- [ ] 設計 Record 資料格式（含 title, location, time, description_json, images, tags, is_public）
- [ ] 設計時間欄位格式（datetime / century）
- [ ] 建立範例資料與測試用資料集

## 📦 其他功能（可擴充）

- [ ] 搜尋與標籤過濾功能
- [ ] 檢視所有資料清單
- [ ] 上傳圖片支援（Firebase Storage）
- [ ] 導覽列語言切換（如需支援 i18n）
