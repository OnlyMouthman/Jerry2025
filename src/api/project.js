import { db } from '@/firebase';
import { doc, collection, getDocs, addDoc, deleteDoc  } from 'firebase/firestore';

export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createProject = async (name) => {
    await addDoc(collection(db, 'projects'), { name });
};

// 刪除子專案及其 features
const deleteSubProjectsAndFeatures = async (projectId) => {
    const subProjectsSnapshot = await getDocs(collection(db, `projects/${projectId}/subprojects`));

    for (const subProjectDoc of subProjectsSnapshot.docs) {
        const subProjectId = subProjectDoc.id;

        // 刪除 features
        const featuresSnapshot = await getDocs(collection(db, `projects/${projectId}/subprojects/${subProjectId}/features`));
        for (const featureDoc of featuresSnapshot.docs) {
            await deleteDoc(doc(db, `projects/${projectId}/subprojects/${subProjectId}/features`, featureDoc.id));
        }

        // 刪除子專案
        await deleteDoc(doc(db, `projects/${projectId}/subprojects`, subProjectId));
    }
};

// 刪除專案及其所有相關資料
export const deleteProjectAPI = async (projectId) => {
    await deleteSubProjectsAndFeatures(projectId); // 先刪子專案和 features
    await deleteDoc(doc(db, 'projects', projectId)); // 最後刪專案
};