import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/AddressBook.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "addressBook",
      component: HomeView,
    },
    {
      path: "/form/:id?",
      name: "form",
      component: () => import("../views/AddressBookForm.vue"),
    },
  ],
});

export default router;
