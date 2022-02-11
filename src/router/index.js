import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Products from "../views/Products.vue";
import ProductType from "../views/ProductType.vue";
import Orders from "../views/Orders.vue";
import ProductList from "../views/ProductList.vue"
import { isUserLoggedApi } from "../services/token";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/product-type",
    name: "ProductTypes",
    component: ProductType,
  },
  {
    path: "/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/new-order",
    name: "NewOrder",
    component: ProductList,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
const auth = isUserLoggedApi();
router.beforeEach((to, _, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const authNotRequired = publicPages.includes(to.path);

  if (authNotRequired && auth) {
    return next("/");
  }

  if (authRequired && !auth) {
    return next("/login");
  }

  next();
});

export default router;
