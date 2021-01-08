import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import ChangeUser from "../views/ChangeUser.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/change_user",
    name: "ChangeUser",
    component: ChangeUser,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
