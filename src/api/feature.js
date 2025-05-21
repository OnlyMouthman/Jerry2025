import { db } from '@/firebase'
import { collection, addDoc, query, where, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore'

// 建立 feature（獨立在 features 頂層 collection）
export const createFeature = async (data) => {
  await addDoc(collection(db, 'features'), data)
}

// 取得指定子專案的 features
export const getFeatures = async (subProjectId) => {
  const q = query(collection(db, 'features'), where('subProjectId', '==', subProjectId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// 更新 feature
export const updateFeature = async (id, { name, type, geometry }) => {
  await updateDoc(doc(db, 'features', id), {
    ...(name && { name }),
    ...(type && { type }),
    ...(geometry && { geometry: JSON.stringify(geometry) })
  })
}


// 刪除 feature
export const deleteFeature = async (id) => {
  await deleteDoc(doc(db, 'features', id))
}