import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const createSubProject = async (projectId, name) => {
    await addDoc(collection(db, `projects/${projectId}/subprojects`), { name });
};

export const getSubProjects = async (projectId) => {
    const querySnapshot = await getDocs(collection(db, `projects/${projectId}/subprojects`));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getFeatures = async (subProjectId) => {
    const querySnapshot = await getDocs(collection(db, `subprojects/${subProjectId}/features`));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};