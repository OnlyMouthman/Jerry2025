import { db } from '@/firebase';
import { doc, deleteDoc, collection, getDocs, addDoc, updateDoc, query, where } from 'firebase/firestore';

export const createSubProject = async (projectId, name) => {
    await addDoc(collection(db, `projects/${projectId}/subprojects`), { name });
};

export const getSubProjects = async (projectId) => {
    const querySnapshot = await getDocs(collection(db, `projects/${projectId}/subprojects`));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// 刪除子專案及其 features
export const deleteSubProjectAPI = async (projectId, subProjectId) => {
    // 刪除 Firestore 中的 features（根據 subProjectId）
    const featuresQuery = query(collection(db, 'features'), where('subProjectId', '==', subProjectId))
    const snapshot = await getDocs(featuresQuery)

    const deletePromises = snapshot.docs.map(docSnap => deleteDoc(doc(db, 'features', docSnap.id)))
    await Promise.all(deletePromises)

    await deleteDoc(doc(db, `projects/${projectId}/subprojects`, subProjectId));
};

export async function updateSubProjectAPI(projectId, subProjectId, data) {
    const docRef = doc(db, `projects/${projectId}/subprojects/${subProjectId}`)
    await updateDoc(docRef, data)
}