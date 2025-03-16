# Vue 3 多頁面專案

## 📌 專案說明

本專案是一個使用 Vue 3 和 Tailwind CSS 建立的多頁面應用，包含 **首頁 (`/`)** 和 **管理頁面 (`/manage`)**，並提供不同的 **Header** 和 **Sidebar** 來對應不同的頁面需求。

## 📁 專案目錄結構

```
src/
│── components/
│   ├── Header.vue           # 一般頁面的導航欄
│   ├── Sidebar.vue          # 一般頁面的側邊欄
│   ├── ManageHeader.vue     # 管理頁面的導航欄
│   ├── ManageSidebar.vue    # 管理頁面的側邊欄
│
│── views/
│   ├── HomePage.vue         # 首頁 `/`
│   ├── ManagePage.vue       # 管理頁 `/manage`
│
│── router/
│   ├── index.js             # Vue Router 設定
│
│── App.vue                  # Vue 入口文件（載入 router-view）
│── main.js                  # Vue 應用的主要入口
```

## ⚙️ 安裝與執行

### 1. 安裝依賴

```sh
npm install
```

### 2. 啟動開發伺服器

```sh
npm run dev
```

### 3. 編譯正式版

```sh
npm run build
```

## 🚀 功能介紹

### 🏠 首頁 `/`

- 包含 `Header.vue` 和 `Sidebar.vue`
- 點擊 **左上角按鈕** 可開啟/關閉 Sidebar
- 點擊 **右上角用戶頭像** 可跳轉到 `/manage`

### ⚙️ 管理頁面 `/manage`

- 使用 `ManageHeader.vue` 和 `ManageSidebar.vue`
- 具有與首頁相同的結構，但功能可獨立擴展
- 透過 `router.push("/manage")` 進入此頁面

## 🛠️ 開發規則

- `HomePage.vue` 和 `ManagePage.vue` 內的 `<main>` 統一使用：
  ```html
  <main class="pt-14 flex items-center justify-center h-[calc(100vh-56px)]">
  ```
- `Header.vue` 和 `Sidebar.vue` 只適用於 `/`
- `ManageHeader.vue` 和 `ManageSidebar.vue` 只適用於 `/manage`
- `App.vue` 只負責載入 `<router-view />`，不直接處理 `Header` 或 `Sidebar`

## 📌 版本與技術

- Vue 3 + Composition API
- Vue Router
- Tailwind CSS 3

## 📝 TODO
