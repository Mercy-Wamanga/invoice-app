import Vue from "vue";
import VueRouter from "vue-router";
import Customer from "../views/Customer.vue";
import Invoice from "../views/Invoice.vue";
import InvoiceItem from "../views/InvoiceItem.vue";
import Product from "../views/Product.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/customer",
    name: "Customer",
    component: Customer,
  },
  {
    path: "/invoice",
    name: "Invoice",
    component: Invoice,
  },
  {
    path: "/product",
    name: "Product",
    component: Product,
  },
  {
    path: "/invoice-item",
    name: "InvoiceItem",
    component: InvoiceItem,
  },
  //{
  //   path: "/customer",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
