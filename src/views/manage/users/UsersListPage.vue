<template>
  <ManageBaseLayout>
    <template #left>
      <!-- 左側內容留空 -->
    </template>

    <template #center>
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">使用者管理</h1>

        <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
          <table class="min-w-full text-sm table-auto">
            <thead>
              <tr class="bg-gray-100 text-gray-700">
                <th class="px-4 py-3 text-left font-semibold whitespace-nowrap">名字</th>
                <th class="px-4 py-3 text-left font-semibold whitespace-nowrap">Email</th>
                <th class="px-4 py-3 text-left font-semibold whitespace-nowrap">身分</th>
                <th class="px-4 py-3 text-left font-semibold whitespace-nowrap">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
                <td class="px-4 py-3 border-t whitespace-nowrap">{{ user.name }}</td>
                <td class="px-4 py-3 border-t whitespace-nowrap">{{ user.email }}</td>
                <td class="px-4 py-3 border-t whitespace-nowrap">{{ getRoleName(user.role) }}</td>
                <td class="px-4 py-3 border-t whitespace-nowrap">
                  <button @click="openEditDialog(user)"
                    class="text-blue-600 hover:underline hover:text-blue-800 text-sm">
                    編輯
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 編輯Dialog -->
        <div v-if="isDialogOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div class="bg-white p-6 rounded-xl w-80 md:w-[400px] shadow-2xl animate-fadeIn">
            <h2 class="text-2xl font-bold mb-6 text-center">編輯使用者</h2>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-1">名字</label>
              <div class="text-gray-900 font-semibold bg-gray-100 p-2 rounded">{{ editingUser.name }}</div>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-medium mb-1">Email</label>
              <div class="text-gray-900 bg-gray-100 p-2 rounded">{{ editingUser.email }}</div>
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-medium mb-1">選擇身分</label>
              <select v-model="selectedRole" class="border rounded w-full p-2">
                <option disabled value="">請選擇身分</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>

            <div class="flex justify-end space-x-3">
              <button @click="isDialogOpen = false"
                class="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-500">
                取消
              </button>
              <button @click="saveUserRole" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                儲存
              </button>
            </div>
          </div>
        </div>


      </div>
      <div v-if="toastMessage"
        class="fixed bottom-6 right-6 bg-black/80 text-white text-base px-6 py-3 rounded-xl shadow-xl animate-fadeIn z-50">
        {{ toastMessage }}
      </div>
    </template>

    <template #right>
      <!-- 右側內容留空 -->
    </template>
  </ManageBaseLayout>
</template>

<script setup>
import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
import { ref, onMounted } from 'vue'
import { getUsersList, updateUserRole } from '@/api/user'
import { getRolesList } from '@/api/role'

const users = ref([])
const roles = ref([])
const loading = ref(false)

// Dialog控制
const isDialogOpen = ref(false)
const editingUser = ref(null)
const selectedRole = ref('')

onMounted(async () => {
  try {
    [users.value, roles.value] = await Promise.all([
      getUsersList(),
      getRolesList()
    ])
  } catch (error) {
    console.error('載入使用者或角色失敗', error)
  }
})

// 打開編輯Dialog
const openEditDialog = (user) => {
  editingUser.value = { ...user }  // 複製一份，避免直接改原本的
  selectedRole.value = user.role || ''
  isDialogOpen.value = true
}

// 儲存修改
const saveUserRole = async () => {
  if (!editingUser.value) return

  loading.value = true
  try {
    await updateUserRole(editingUser.value.id, selectedRole.value)

    const target = users.value.find(u => u.id === editingUser.value.id)
    if (target) {
      target.role = selectedRole.value
    }

    showToast('更新成功！') // ✅ Toast提示
    isDialogOpen.value = false
  } catch (error) {
    console.error('更新使用者失敗', error)
    showToast('更新失敗，請稍後再試')
  } finally {
    loading.value = false
  }
}
const getRoleName = (roleId) => {
  const role = roles.value.find(r => r.id === roleId)
  return role ? role.name : '(未知角色)'
}
const toastMessage = ref('')
const showToast = (message) => {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>
