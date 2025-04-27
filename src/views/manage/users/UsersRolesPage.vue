<template>
    <ManageBaseLayout>
        <template #left>
            <!-- 左側留空 -->
        </template>

        <template #center>
            <div class="p-6">
                <h1 class="text-2xl font-bold mb-6">身分權限管理</h1>

                <div class="flex justify-end space-x-4 mb-4">
                    <button @click="isAddRoleDialogOpen = true" :disabled="loading"
                        class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm shadow-md">
                        新增角色
                    </button>
                    <button @click="saveChanges" :disabled="loading"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm shadow-md">
                        {{ loading ? '儲存中...' : '儲存變更' }}
                    </button>
                </div>

                <div class="overflow-x-auto bg-white rounded-lg shadow p-4">
                    <table class="min-w-full text-sm table-auto">
                        <thead>
                            <tr class="bg-gray-100 text-gray-700">
                                <th class="px-4 py-3 text-left font-semibold whitespace-nowrap">權限/角色</th>
                                <th v-for="role in roles" :key="role.id"
                                    class="px-4 py-3 border-l text-center font-semibold group relative whitespace-nowrap">
                                    <div class="flex items-center justify-center space-x-2">
                                        <span>{{ role.name }}</span>
                                        <button v-if="role.key !== 'admin'" @click="removeRole(role.id)"
                                            class="text-red-500 hover:text-red-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            title="刪除角色">
                                            ✕
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="permission in permissions" :key="permission.id" class="hover:bg-gray-50">
                                <td class="px-4 py-3 border-t whitespace-nowrap">{{ permission.name }}</td>
                                <td v-for="role in roles" :key="role.id + '-' + permission.key"
                                    class="px-4 py-3 border-t text-center">
                                    <input type="checkbox" v-model="role.permissions" :value="permission.key"
                                        :disabled="role.key === 'admin'" class="w-4 h-4" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 簡單版 Toast 提示 -->
                <div v-if="toastMessage"
                    class="fixed bottom-6 right-6 bg-black/80 text-white text-base px-6 py-3 rounded-xl shadow-xl animate-fadeIn z-50">
                    {{ toastMessage }}
                </div>

                <!-- 新增角色Dialog -->
                <div v-if="isAddRoleDialogOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div class="bg-white p-6 rounded-xl w-80 md:w-[400px] shadow-2xl animate-fadeIn">
                        <h2 class="text-2xl font-bold mb-6 text-center">新增角色</h2>

                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-medium mb-1">角色名稱</label>
                            <input v-model="newRoleName" type="text" class="border rounded w-full p-2"
                                placeholder="請輸入角色名稱" />
                        </div>

                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-medium mb-1">選擇預設權限</label>
                            <div class="flex flex-col space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                                <div v-for="permission in permissions" :key="permission.key"
                                    class="flex items-center space-x-2">
                                    <input type="checkbox" :value="permission.key" v-model="newRolePermissions"
                                        class="w-4 h-4" />
                                    <label class="text-gray-700 text-sm">{{ permission.name }}</label>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-3">
                            <button @click="isAddRoleDialogOpen = false"
                                class="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-500">
                                取消
                            </button>
                            <button @click="addNewRole"
                                class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">
                                新增
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #right>
            <!-- 右側留空 -->
        </template>
    </ManageBaseLayout>
</template>

<script setup>
import ManageBaseLayout from '@/layouts/ManageBaseLayout.vue'
import { ref, onMounted } from 'vue'
import { getRolesList, updateRolePermissions, createRole, deleteRole } from '@/api/role'
import { getPermissionsList } from '@/api/permission'

const roles = ref([])
const permissions = ref([])
const loading = ref(false)

// 簡單版 Toast訊息
const toastMessage = ref('')
const showToast = (message) => {
    toastMessage.value = message
    setTimeout(() => {
        toastMessage.value = ''
    }, 3000)
}

const isAddRoleDialogOpen = ref(false)
const newRoleName = ref('')
const newRolePermissions = ref([])

onMounted(async () => {
    try {
        [roles.value, permissions.value] = await Promise.all([
            getRolesList(),
            getPermissionsList()
        ])
    } catch (error) {
        console.error('載入角色或權限失敗', error)
        showToast('載入失敗，請稍後再試')
    }
})

// 儲存所有角色權限設定
const saveChanges = async () => {
    loading.value = true
    try {
        for (const role of roles.value) {
            await updateRolePermissions(role.id, role.permissions)
        }
        showToast('儲存成功！')
    } catch (error) {
        console.error('儲存失敗', error)
        showToast('儲存失敗，請稍後再試')
    } finally {
        loading.value = false
    }
}

// 工具：自動產生 key
const generateRandomKey = () => {
  const randomString = Math.random().toString(36).substring(2, 10)
  return `role_${randomString}`
}

// 新增角色
const addNewRole = async () => {
    if (!newRoleName.value.trim()) {
        showToast('請輸入角色名稱')
        return
    }

    loading.value = true
    try {
        const key = generateRandomKey(newRoleName.value)

        // 🔥 新增角色到 Firebase
        const createdRole = await createRole(newRoleName.value.trim(), newRolePermissions.value, key)

        // 🔥 自己補 key
        roles.value.push({
            ...createdRole,
            key: key
        })

        roles.value.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
        showToast('新增角色成功！')

        isAddRoleDialogOpen.value = false
        newRoleName.value = ''
        newRolePermissions.value = []
    } catch (error) {
        console.error('新增角色失敗', error)
        showToast('新增失敗，請稍後再試')
    } finally {
        loading.value = false
    }
}



// 刪除角色
const removeRole = async (roleId) => {
    const role = roles.value.find(r => r.id === roleId)
    if (role?.key === 'admin') {
        showToast('無法刪除管理員角色！')
        return
    }

    const confirmDelete = confirm('確定要刪除這個角色嗎？刪除後無法恢復！')
    if (!confirmDelete) return

    loading.value = true
    try {
        await deleteRole(roleId)
        roles.value = roles.value.filter(role => role.id !== roleId)
        showToast('刪除成功！')
    } catch (error) {
        console.error('刪除角色失敗', error)
        showToast('刪除失敗，請稍後再試')
    } finally {
        loading.value = false
    }
}
</script>