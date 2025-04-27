// src/api/role.js
import { getFirestore, collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'

const db = getFirestore()

export async function getRolesList() {
  const querySnapshot = await getDocs(collection(db, 'roles'))
  const roles = []
  querySnapshot.forEach((doc) => {
    roles.push({ id: doc.id, ...doc.data() })
  })
  return roles
}

export async function updateRolePermissions(roleId, permissions) {
  const roleRef = doc(db, 'roles', roleId)
  await updateDoc(roleRef, { permissions })
}

// ✅ createRole 改版：多接一個 key！
export async function createRole(name, permissions = [], key = '') {
  const rolesCollection = collection(db, 'roles')
  const docRef = await addDoc(rolesCollection, {
    name,
    permissions,
    key // 🔥 多存 key 進去！
  })
  return { id: docRef.id, name, permissions, key } // 🔥 回傳時也帶 key 出來
}

// ✅ 刪除角色
export async function deleteRole(roleId) {
  const roleRef = doc(db, 'roles', roleId)
  await deleteDoc(roleRef)
}
