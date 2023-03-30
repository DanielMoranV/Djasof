import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Edit from "../views/Edit.vue";
import Perfil from "../views/Perfil.vue";
import NotFound from "../views/NotFound.vue";

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
const redireccion = async (to, from, next) => {
  const databaseStore = useDatabaseStore();
  const userStore = useUserStore();
  userStore.loadingSession = true;
  // console.log(to.params.pathMatch[0]);
  const name = await databaseStore.getURL(to.params.pathMatch[0]);
  if (!name) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = name;
    userStore.loadingSession = true;
    next();
  }
};

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    name: "dashboard",
  },
  {
    path: "/perfil",
    component: Perfil,
    beforeEnter: requireAuth,
    name: "perfil",
  },
  {
    path: "/edit/:id",
    component: Edit,
    beforeEnter: requireAuth,
    name: "edit",
  },
  { path: "/login", component: Login, name: "login" },
  { path: "/register", component: Register, name: "register" },
  { path: "/", component: Home, name: "home" },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "404",
    beforeEnter: redireccion,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
