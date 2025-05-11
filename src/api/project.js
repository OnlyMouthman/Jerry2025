import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createProject = async (name) => {
    await addDoc(collection(db, 'projects'), { name });
};
