<template>
  <div v-if="visible" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  
    <div class="bg-white rounded-lg p-6 w-64">
      <h2 class="text-lg font-semibold mb-4">{{ $t('language') }}</h2>
      <ul class="space-y-2">
        <li>
          <label class="flex items-center space-x-2">
            <input type="radio" name="lang" value="zh-TW" v-model="selectedLang" />
            <span>中文</span>
          </label>
        </li>
        <li>
          <label class="flex items-center space-x-2">
            <input type="radio" name="lang" value="en" v-model="selectedLang" />
            <span>English</span>
          </label>
        </li>
      </ul>
      <div class="flex justify-end mt-4 space-x-2">
        <button class="px-3 py-1 text-sm text-gray-600" @click="close">取消</button>
        <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm" @click="apply">{{ $t('confirm') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()

const visible = ref(false)
const selectedLang = ref(locale.value)

const open = () => {
  selectedLang.value = locale.value
  visible.value = true
}

const close = () => {
  visible.value = false
}

const apply = () => {
  locale.value = selectedLang.value
  setLocale(selectedLang.value)
  close()
}

defineExpose({ open })
</script>