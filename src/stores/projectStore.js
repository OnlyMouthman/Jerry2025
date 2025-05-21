// src/stores/project.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('project', () => {
  const selectedProject = ref(null)
  const selectedSubProject = ref(null)
  const selectedFeature = ref(null)

  const clearDate = () =>{
    selectedProject.value = null
    selectedSubProject.value = null 
    selectedFeature.value = null
    //console.log(selectedProject, selectedSubProject, selectedFeature)
  }

  const setProject = (project) => {
    selectedProject.value = project
    selectedSubProject.value = null 
    selectedFeature.value = null
    //console.log(selectedProject, selectedSubProject, selectedFeature)
  }

  const setSubProject = (subProject) => {
    selectedSubProject.value = subProject
    selectedFeature.value = null
    //console.log(selectedProject, selectedSubProject, selectedFeature)
  }
  const setFeature = (feature) => {
    selectedFeature.value = feature
    //console.log(selectedProject, selectedSubProject, selectedFeature)
  }
  return {
    selectedProject,
    selectedSubProject,
    selectedFeature,
    setProject,
    setSubProject,
    setFeature,
    clearDate
  }
})
