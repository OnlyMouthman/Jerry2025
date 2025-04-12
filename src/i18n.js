import { createI18n } from 'vue-i18n'
import zhTW from './locales/zh-TW'
import en from './locales/en'

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'zh-TW',
  fallbackLocale: 'en',
  messages: {
    'zh-TW': zhTW,
    'en': en
  }
})

// 寫入時同步更新 localStorage
export function setLocale(lang) {
  localStorage.setItem('locale', lang)
}