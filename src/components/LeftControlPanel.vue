<template>
    <aside class="w-full h-full shadow-md p-0 flex flex-col z-10 overflow-hidden">
        <div class="flex-1 custom-scrollbar overflow-y-auto">
            <!-- 專案清單 -->
            <div class="flex justify-between items-center mb-2 px-4 pt-4 group">
                <h2 class="text-gray-600 text-ls font-semibold flex items-center">
                    <i v-if="isDetailMode" class="material-icons text-sm mr-1 cursor-pointer"
                        @click="backToProjectList">arrow_back</i>
                    {{ isDetailMode ? selectedProject.name : '專案清單' }}
                </h2>
                <button v-if="!isDetailMode" @click="isDialogOpen = true"
                    class="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <i class="material-icons">add</i>
                </button>
                <button v-if="isDetailMode" @click="openSubProjectDialog = true"
                    class="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <i class="material-icons">add</i>
                </button>
            </div>

            <ul class="space-y-1 px-4">
                <template v-if="!isDetailMode">
                    <li v-for="project in projects" :key="project.id" class="group">
                        <button @click="enterDetailMode(project)"
                            class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex justify-between items-center cursor-pointer"
                            :class="{ 'bg-gray-200 font-bold': selectedProject?.id === project.id }">
                            <span class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2">folder</i>
                                {{ project.name }}
                            </span>
                            <div class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer"
                                    @click.stop="openEditProjectDialog(project)">edit</i>
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer"
                                    @click.stop="openDeleteDialog(project)">delete</i>
                            </div>
                        </button>
                    </li>
                </template>
                <!-- 子專案清單 -->
                <template v-else>
                    <li v-for="sub in subProjects" :key="sub.id" class="group">
                        <button @click="toggleSubProject(sub)"
                            class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex justify-between items-center cursor-pointer">
                            <span class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2">folder</i>
                                {{ sub.name }}
                            </span>
                            <div class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer"
                                    @click.stop="openEditSubProjectDialog(sub)">edit</i>
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer"
                                    @click.stop="openDeleteSubDialog(sub)">delete</i>
                                <i class="material-icons text-gray-400 text-sm cursor-pointer">{{ sub.expanded ?
                                    'expand_less' : 'expand_more' }}</i>
                            </div>
                        </button>

                        <ul v-if="sub.expanded" class="ml-6 mt-1 space-y-1">
                            <!-- 新增圖徵按鈕 -->
                            <li @click="openAddFeatureDialog(sub)"
                                class="flex items-center cursor-pointer text-blue-600">
                                <i class="material-icons text-sm mr-1">add</i> 新增圖徵
                            </li>

                            <!-- 現有圖徵列表 -->
                            <li v-for="feature in sub.features" :key="feature.id" >
                                <button @click="toggleFeature(feature)"
                                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex justify-between items-center cursor-pointer">
                                    <div class="flex items-center">
                                        <i class="material-icons text-gray-400 text-xs mr-2">{{ getFeatureIcon(feature.type)
                                        }}</i>
                                        <span>{{ feature.name }}</span>
                                    </div>
                                    <div class="flex space-x-1">
                                        <i class="material-icons text-sm text-gray-400 cursor-pointer"
                                            @click.stop="openEditFeatureDialog(feature)">edit</i>
                                        <i class="material-icons text-sm text-gray-400 cursor-pointer"
                                            @click.stop="confirmDeleteFeature(feature)">delete</i>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </aside>

    <!-- 新增專案 -->
    <div v-if="isDialogOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">新增專案</h2>
            <input v-model="newProjectName" type="text" placeholder="專案名稱" class="border rounded w-full p-2 mb-4" />
            <div class="flex justify-end space-x-2">
                <button @click="isDialogOpen = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="createProjectName"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">建立</button>
            </div>
        </div>
    </div>
    <!-- 新增子專案 -->
    <div v-if="openSubProjectDialog" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">新增子專案</h2>
            <input v-model="newSubProjectName" type="text" placeholder="子專案名稱" class="border rounded w-full p-2 mb-4" />
            <div class="flex justify-end space-x-2">
                <button @click="openSubProjectDialog = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="createSubProjectAction"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">建立</button>
            </div>
        </div>
    </div>

    <!-- 刪除專案 -->
    <div v-if="isDeleteDialogOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">確定刪除專案</h2>
            <p class="text-center">你確定要刪除此專案嗎？此操作不可恢復。</p>
            <div class="flex justify-end space-x-2 mt-4">
                <button @click="isDeleteDialogOpen = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="deleteProject"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">刪除</button>
            </div>
        </div>
    </div>
    <!-- 刪除子專案 -->
    <div v-if="isDeleteSubDialogOpen" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">確定刪除子專案</h2>
            <p class="text-center">你確定要刪除此子專案嗎？此操作不可恢復。</p>
            <div class="flex justify-end space-x-2 mt-4">
                <button @click="isDeleteSubDialogOpen = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="deleteSubProject"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">刪除</button>
            </div>
        </div>
    </div>

    <!-- 編輯子專案 -->
    <div v-if="editDialogVisible" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">編輯子專案</h2>
            <input v-model="editedSubProject.name" type="text" placeholder="子專案名稱"
                class="border rounded w-full p-2 mb-4" />
            <div class="flex justify-end space-x-2">
                <button @click="editDialogVisible = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="saveEdit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">儲存</button>
            </div>
        </div>
    </div>

    <!-- 編輯專案 -->
    <div v-if="editProjectDialogVisible" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">編輯專案</h2>
            <input v-model="editedProject.name" type="text" placeholder="專案名稱" class="border rounded w-full p-2 mb-4" />
            <div class="flex justify-end space-x-2">
                <button @click="editProjectDialogVisible = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="saveEditProject"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">儲存</button>
            </div>
        </div>
    </div>

    <!-- 新增圖徵 -->
    <div v-if="featureDialogVisible" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-96 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">新增圖徵</h2>

            <input v-model="newFeature.name" type="text" placeholder="圖徵名稱" class="border rounded w-full p-2 mb-4" />

            <select v-model="newFeature.type" class="border rounded w-full p-2 mb-4">
                <option value="point">點</option>
                <option value="line">線</option>
                <option value="polygon">面</option>
            </select>

            <div class="flex justify-end space-x-2">
                <button @click="featureDialogVisible = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="createFeatureAction"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">建立</button>
            </div>
        </div>
    </div>
    <!-- 編輯圖徵 -->
    <div v-if="editFeatureDialogVisible" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-96 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">編輯圖徵</h2>

            <input v-model="featureToEdit.name" type="text" class="border rounded w-full p-2 mb-4" placeholder="圖徵名稱" />
            <select v-model="featureToEdit.type" class="border rounded w-full p-2 mb-4">
                <option value="point">點</option>
                <option value="line">線</option>
                <option value="polygon">面</option>
            </select>

            <div class="flex justify-end space-x-2">
                <button @click="editFeatureDialogVisible = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg">取消</button>
                <button @click="saveEditFeature"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">儲存</button>
            </div>
        </div>
    </div>
    <!-- 刪除圖徵 -->
    <div v-if="deleteFeatureDialogVisible" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-96 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">確定刪除圖徵？</h2>
            <p class="text-center">此操作將永久移除圖徵。</p>
            <div class="flex justify-end space-x-2 mt-4">
                <button @click="deleteFeatureDialogVisible = false"
                    class="px-4 py-2 text-gray-600 border rounded-lg">取消</button>
                <button @click="deleteFeatureAction"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">刪除</button>
            </div>
        </div>
    </div>
    <!-- Toast 提示 -->
    <div v-if="toastMessage"
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-xl z-[99999] animate-fadeIn">
        {{ toastMessage }}
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getProjects, createProject, deleteProjectAPI, updateProjectAPI } from '@/api/project'
import { getSubProjects, createSubProject, deleteSubProjectAPI, updateSubProjectAPI } from '@/api/subproject'
import { createFeature, getFeatures, updateFeature, deleteFeature } from '@/api/feature'
import { useProjectStore } from '@/stores/projectStore' 
// Toast
const toastMessage = ref('')
const showToast = (message) => {
    toastMessage.value = message
    setTimeout(() => {
        toastMessage.value = ''
    }, 3000)
}

// State
const projectStore = useProjectStore()
const isDialogOpen = ref(false);
const newProjectName = ref('');
const isDetailMode = ref(false);
const projects = ref([])
const subProjects = ref([]);
const selectedProject = ref(null);
const openSubProjectDialog = ref(false);
const newSubProjectName = ref('');
const isDeleteDialogOpen = ref(false);
const projectToDelete = ref(null);
const isDeleteSubDialogOpen = ref(false);
const subProjectToDelete = ref(null);
const editDialogVisible = ref(false)
const editedSubProject = ref({ id: '', name: '' })
const editProjectDialogVisible = ref(false)
const editedProject = ref({ id: '', name: '' })
const featureDialogVisible = ref(false)
const featureTargetSubProject = ref(null)
const editFeatureDialogVisible = ref(false)
const featureToEdit = ref(null)
const deleteFeatureDialogVisible = ref(false)
const featureToDelete = ref(null)

const newFeature = ref({
    name: '',
    type: 'point'
})

function openAddFeatureDialog(subProject) {
    featureTargetSubProject.value = subProject
    newFeature.value = { name: '', type: 'point' }
    featureDialogVisible.value = true
}

const createFeatureAction = async () => {
    const sub = featureTargetSubProject.value
    if (!sub || !newFeature.value.name.trim()) return

    await createFeature({
        name: newFeature.value.name.trim(),
        type: newFeature.value.type,
        projectId: selectedProject.value.id,
        subProjectId: sub.id,
        createdAt: new Date()
    })

    // 重新取得 feature 資料
    sub.features = await getFeatures(sub.id)
    featureDialogVisible.value = false
    showToast('✅ 圖徵已新增')
}

// Project CRUD
const createProjectName = async () => {
    if (newProjectName.value.trim()) {
        await createProject(newProjectName.value.trim())
        projects.value = await getProjects()
        newProjectName.value = ''
        isDialogOpen.value = false
        showToast('✅ 專案建立成功')
    }
}

const deleteProject = async () => {
    if (projectToDelete.value) {
        await deleteProjectAPI(projectToDelete.value.id);
        projects.value = await getProjects();
        isDeleteDialogOpen.value = false;
        showToast('🗑️ 專案已刪除')
    }
}

function openEditProjectDialog(project) {
    editedProject.value = { ...project }
    editProjectDialogVisible.value = true
}

const saveEditProject = async () => {
    if (!editedProject.value.id || !editedProject.value.name.trim()) return
    try {
        await updateProjectAPI(editedProject.value.id, {
            name: editedProject.value.name.trim()
        })
        projects.value = await getProjects()
        editProjectDialogVisible.value = false
        showToast('✏️ 專案名稱已更新')
    } catch (err) {
        console.error('專案編輯失敗', err)
        showToast('❌ 專案編輯失敗')
    }
}

// Subproject CRUD
const createSubProjectAction = async () => {
    if (newSubProjectName.value.trim()) {
        await createSubProject(selectedProject.value.id, newSubProjectName.value.trim());
        subProjects.value = await getSubProjects(selectedProject.value.id);
        newSubProjectName.value = '';
        openSubProjectDialog.value = false;
        showToast('✅ 子專案建立成功')
    }
}

const deleteSubProject = async () => {
    if (subProjectToDelete.value) {
        await deleteSubProjectAPI(selectedProject.value.id, subProjectToDelete.value.id);
        subProjects.value = await getSubProjects(selectedProject.value.id);
        isDeleteSubDialogOpen.value = false;
        showToast('🗑️ 子專案已刪除')
    }
}

function openEditSubProjectDialog(subProject) {
    editedSubProject.value = { ...subProject }
    editDialogVisible.value = true
}

const saveEdit = async () => {
    if (!editedSubProject.value.id || !editedSubProject.value.name.trim()) return
    try {
        await updateSubProjectAPI(selectedProject.value.id, editedSubProject.value.id, {
            name: editedSubProject.value.name.trim()
        })
        const rawSubs = await getSubProjects(selectedProject.value.id)
        subProjects.value = []

        for (const sub of rawSubs) {
            const features = await getFeatures(sub.id)
            subProjects.value.push({
                ...sub,
                expanded: false,
                features: features
            })
        }
        editDialogVisible.value = false
        showToast('✏️ 子專案名稱已更新')
    } catch (err) {
        console.error('子專案編輯失敗', err)
        showToast('❌ 子專案編輯失敗')
    }
}

// Navigation / Helpers
const openDeleteDialog = (project) => {
    projectToDelete.value = project;
    isDeleteDialogOpen.value = true;
};

const openDeleteSubDialog = (sub) => {
    subProjectToDelete.value = sub;
    isDeleteSubDialogOpen.value = true;
};

const backToProjectList = () => {
    isDetailMode.value = false;
    selectedProject.value = null;
    subProjects.value = [];
    projectStore.clearDate()
};

const toggleSubProject = async (sub) => {
    sub.expanded = !sub.expanded
    if (sub.expanded && sub.features.length === 0) {
        sub.features = await getFeatures(sub.id)
    }
    projectStore.setSubProject(sub)
}

const toggleFeature = async (feature) => {
    projectStore.setFeature(feature)
}

const getFeatureIcon = (type) => {
    if (type === 'point') return 'location_on';
    if (type === 'line') return 'show_chart';
    if (type === 'polygon') return 'crop_square';
    return 'help_outline';
};

const enterDetailMode = async (project) => {
    selectedProject.value = project
    isDetailMode.value = true
    const rawSubs = await getSubProjects(project.id)
    subProjects.value = rawSubs.map(sub => ({
        ...sub,
        expanded: false,
        features: []
    }))
    //紀錄 點了哪個project
    projectStore.setProject(project)
}

// 編輯
const openEditFeatureDialog = (feature) => {
    featureToEdit.value = { ...feature }
    editFeatureDialogVisible.value = true
}

const saveEditFeature = async () => {
    if (!featureToEdit.value.id || !featureToEdit.value.name.trim()) return
    await updateFeature(featureToEdit.value.id, {
        name: featureToEdit.value.name.trim(),
        type: featureToEdit.value.type
    })

    // 重新載入圖徵資料
    const sub = subProjects.value.find(s => s.id === featureToEdit.value.subProjectId)
    if (sub) sub.features = await getFeatures(sub.id)

    editFeatureDialogVisible.value = false
    showToast('✏️ 圖徵已更新')
}

// 刪除
const confirmDeleteFeature = (feature) => {
    featureToDelete.value = feature
    deleteFeatureDialogVisible.value = true
}

const deleteFeatureAction = async () => {
    if (!featureToDelete.value) return
    await deleteFeature(featureToDelete.value.id)

    // 重新載入圖徵資料
    const sub = subProjects.value.find(s => s.id === featureToDelete.value.subProjectId)
    if (sub) sub.features = await getFeatures(sub.id)

    deleteFeatureDialogVisible.value = false
    showToast('🗑️ 圖徵已刪除')
}

onMounted(async () => {
    projects.value = await getProjects()
})
</script>



<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4);
}
</style>