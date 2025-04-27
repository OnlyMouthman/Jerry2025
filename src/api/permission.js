import { getFirestore, collection, getDocs } from 'firebase/firestore'

const db = getFirestore()

export async function getPermissionsList() {
  const querySnapshot = await getDocs(collection(db, 'permissions'))
  const permissions = []
  querySnapshot.forEach((doc) => {
    permissions.push({ id: doc.id, ...doc.data() })
  })

  // 根據 sort_order 排序
  permissions.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return permissions
}