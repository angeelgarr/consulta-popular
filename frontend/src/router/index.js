import Vue from "vue";
import VueRouter from "vue-router";
import Votar from "../views/Votar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Votar",
    component: Votar,
  },
  {
    path: "/acerca-de",
    name: "Acerca de",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "acerca-de" */ "../views/AcercaDe.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
