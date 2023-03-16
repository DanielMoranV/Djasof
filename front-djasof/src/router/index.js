import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";

const requireAuth = async (to, from, next) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if (user) {
        next();
    } else {
        next("/login");
    }
    userStore.loadingSession = false;
};

const routes = [
    { path: "/dashboard", component: Dashboard, beforeEnter: requireAuth },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/", component: Home}
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
