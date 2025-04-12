<template>
    <main class="pt-14 flex flex-col items-center justify-center h-[calc(100vh-56px)]">
        <h1 class="text-2xl font-bold mb-4">請使用 Google 登入</h1>
        <button @click="login" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
            使用 Google 登入
        </button>
    </main>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { auth, provider, signInWithPopup } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

// ✅ 若已登入就直接導回 /manage（或原始頁）
onMounted(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const redirectPath = route.query.redirect || '/manage'
            router.replace(redirectPath)
        }
    })
})

const login = async () => {
    try {
        await signInWithPopup(auth, provider)
        const redirectPath = route.query.redirect || '/' // ✅ 改回首頁
        router.push(redirectPath)
    } catch (err) {
        console.error('登入失敗', err)
    }
}
</script>