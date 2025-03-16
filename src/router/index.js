// 引入官方元件
import {createRouter, createWebHistory} from 'vue-router'  

import HomePage from "../views/HomePage.vue";
import ManagePage from "../views/ManagePage.vue"; // 改名稱


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: HomePage },
        { path: "/manage", component: ManagePage }, // 這裡改成 /manage
    ]
})

const configRouter = async () => {
    await manageRoutes.forEach((item) => {
        router.addRoute("manage", item);
    });
};
// 開發中：後台不擋
//configRouter()

// 每次路由跳轉之前都會執行
// router.beforeEach((to, from, next) => {
//     let AuthenticationStore = useAuthenticationStore(pinia)
//     if (to.name === "login") {
//         next();
//     } else if (to.name === "admin" && !AuthenticationStore.verify) {
//         next({ path: "/account/login" });
//     } else {
//         // 未授權，重定向到登陸頁
//         if (!localStorage.getItem("token")) {
//             next({ path: "/account/login" });
//         } else {
//             // 如果授權(已經登錄過了) next()
//             if (AuthenticationStore.verify) {
//                 configRouter(); // 載入後台路由
//                 next();
//             } else {
//                 next();
//             }
//         }
//     }
// });

export default router