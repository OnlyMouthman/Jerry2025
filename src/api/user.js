// src/api/user.js
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from '@/firebase'

// ✅ 取得所有使用者資料
export async function getUsersList() {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
}

// ✅ 同步登入使用者到 Firestore users 集合
export async function syncUserToFirestore(user) {
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: "user", // 預設身分是 user
    });
  }
}

// ✅ 更新使用者角色
export async function updateUserRole(userId, newRole) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, { role: newRole });
}
// 🔥 建立完整的 user 資料（含權限）
export async function buildUserProfile(user) {
  const userRef = doc(db, "users", user.uid)
  const userSnapshot = await getDoc(userRef)

  if (!userSnapshot.exists()) {
    throw new Error('找不到使用者資料')
  }

  const userData = userSnapshot.data()

  const roleRef = doc(db, "roles", userData.role)
  const roleSnapshot = await getDoc(roleRef)
  if (!roleSnapshot.exists()) {
    throw new Error('找不到角色資料')
  }

  const roleData = roleSnapshot.data()

  return {
    uid: user.uid,
    name: userData.name,             // 🔥 改成從 Firestore users.name 拿
    email: userData.email,           // 🔥 改成從 Firestore users.email 拿
    photoURL: user.photoURL,          // 保留，可以未來顯示大頭貼用
    role: userData.role,
    permissions: roleData.permissions || []
  }
}