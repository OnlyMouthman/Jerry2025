<template>
    <aside class="w-full h-full shadow-md p-0 flex flex-col z-10 overflow-hidden">
        <div class="flex-1 custom-scrollbar overflow-y-auto">
            <!-- 專案清單 -->
            <div class="flex justify-between items-center mb-2 px-4 pt-4 group">
                <h2 class="text-gray-600 text-ls font-semibold flex items-center">
                    <i v-if="isDetailMode" class="material-icons text-sm mr-1 cursor-pointer" @click="backToProjectList">arrow_back</i>
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
                            class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex justify-between items-center"
                            :class="{ 'bg-gray-200 font-bold': selectedProject?.id === project.id }">
                            <span class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2">folder</i>
                                {{ project.name }}
                            </span>
                            <div>
                                <i class="material-icons text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    @click.stop="editProject(project)">edit</i>
                                <i class="material-icons text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                    @click.stop="editProject(project)">delete</i>
                            </div>
                            
                        </button>
                    </li>
                </template>

                <template v-else>
                    <li v-for="sub in subProjects" :key="sub.id" class="group">
                        <button @click="toggleSubProject(sub)"
                            class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex justify-between items-center">
                            <span class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer">folder</i>
                                {{ sub.name }}
                            </span>
                            <div class="flex items-center">
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer" @click.stop="editSubProject(sub)">edit</i>
                                <i class="material-icons text-gray-400 text-sm mr-2 cursor-pointer" @click.stop="editSubProject(sub)">delete</i>
                                <i class="material-icons text-gray-400 text-sm cursor-pointer">{{ sub.expanded ? 'expand_less' : 'expand_more' }}</i>
                            </div>
                        </button>

                        <ul v-if="sub.expanded" class="ml-6 mt-1 space-y-1">
                            <li v-for="feature in sub.features" :key="feature.id" class="flex items-center hover:bg-gray-300 transition-colors duration-200 cursor-pointer px-2 py-1 rounded">
                                <i class="material-icons text-gray-400 text-xs mr-2">{{ getFeatureIcon(feature.type)
                                    }}</i>
                                <span>{{ feature.name }}</span>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </aside>

    <!-- Dialog -->
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
    <div v-if="openSubProjectDialog" class="fixed inset-0 bg-black/30 flex items-center justify-center z-[9999]">
        <div class="bg-white p-6 rounded-xl w-80 shadow-2xl animate-fadeIn">
            <h2 class="text-xl font-bold mb-4 text-center">新增子專案</h2>
            <input v-model="newSubProjectName" type="text" placeholder="子專案名稱" class="border rounded w-full p-2 mb-4" />
            <div class="flex justify-end space-x-2">
                <button @click="openSubProjectDialog = false" class="px-4 py-2 text-gray-600 border rounded-lg hover:border-gray-500">取消</button>
                <button @click="createSubProjectAction" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">建立</button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getProjects, createProject } from '@/api/project'
import { getSubProjects, getFeatures, createSubProject  } from '@/api/subproject'
const isDialogOpen = ref(false);
const newProjectName = ref('');
const isDetailMode = ref(false);
const projects = ref([])

const subProjects = ref([]);
const selectedProject = ref(null);
const openSubProjectDialog = ref(false);
const newSubProjectName = ref('');


const backToProjectList = () => {
    isDetailMode.value = false;
    selectedProject.value = null;
    subProjects.value = [];
};

const toggleSubProject = async (sub) => {
    sub.expanded = !sub.expanded
    if (sub.expanded && sub.features.length === 0) {
        sub.features = await getFeatures(sub.id)
    }
}

const getFeatureIcon = (type) => {
    if (type === 'point') return 'location_on';
    if (type === 'line') return 'show_chart';
    if (type === 'polygon') return 'crop_square';
    return 'help_outline';
};

const selectProject = (project) => {
    selectedProject.value = project;
    console.log('選取專案:', project);
};

const createProjectName = async () => {
    if (newProjectName.value.trim()) {
        await createProject(newProjectName.value.trim())
        projects.value = await getProjects()  // 重新載入
        newProjectName.value = ''
        isDialogOpen.value = false
    }
}

const editSubProject = (sub) => {
    console.log('編輯子專案:', sub);
    // 這裡可以開啟 Dialog 來編輯名稱
};

const editProject = (project) => {
    console.log('編輯專案:', project);
};

const enterDetailMode = async (project) => {
    selectedProject.value = project
    isDetailMode.value = true
    const rawSubs = await getSubProjects(project.id)

    // 預設展開 false + 空 features
    subProjects.value = rawSubs.map(sub => ({
        ...sub,
        expanded: false,
        features: []
    }))
}
const createSubProjectAction = async () => {
    if (newSubProjectName.value.trim()) {
        await createSubProject(selectedProject.value.id, newSubProjectName.value.trim());
        subProjects.value = await getSubProjects(selectedProject.value.id);
        newSubProjectName.value = '';
        openSubProjectDialog.value = false;
    }
};

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