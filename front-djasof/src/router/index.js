import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Edit from "../views/Edit.vue";

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
    { path: "/dashboard", component: Dashboard, beforeEnter: requireAuth, name : "dashboard" },
    { path: "/edit/:id", component: Edit, beforeEnter: requireAuth, name : "edit"},
    { path: "/login", component: Login, name: "login"},
    { path: "/register", component: Register, name: "register"},
    { path: "/", component: Home, name: "home"},
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;
