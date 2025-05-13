import { db } from '@/firebase';
import { doc, collection, getDocs, addDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';

export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createProject = async (name) => {
    await addDoc(collection(db, 'projects'), { name });
};

// 刪除子專案 + 相關 features
const deleteSubProjectsAndFeatures = async (projectId) => {
  const subProjectsSnapshot = await getDocs(collection(db, `projects/${projectId}/subprojects`));

  for (const subDoc of subProjectsSnapshot.docs) {
    const subProjectId = subDoc.id;

    // 刪除此子專案對應的 features（從頂層 features 集合）
    const featuresQuery = query(collection(db, 'features'), where('subProjectId', '==', subProjectId));
    const featuresSnapshot = await getDocs(featuresQuery);
    const deleteFeaturePromises = featuresSnapshot.docs.map(f =>
      deleteDoc(doc(db, 'features', f.id))
    );
    await Promise.all(deleteFeaturePromises);

    // 刪除子專案本身
    await deleteDoc(doc(db, `projects/${projectId}/subprojects`, subProjectId));
  }
};

// 刪除專案（連帶子專案和 features）
export const deleteProjectAPI = async (projectId) => {
  await deleteSubProjectsAndFeatures(projectId);
  await deleteDoc(doc(db, 'projects', projectId));
};

export async function updateProjectAPI(projectId, data) {
    const docRef = doc(db, 'projects', projectId)
    await updateDoc(docRef, data)
}