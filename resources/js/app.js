import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Home from "../components/home.vue";
import Product from "../components/product.vue";
import ProductPage from "../components/productpage.vue";
import Men from "../components/Men.vue";
import Electronics from "../components/Electronics.vue";
import wishlist from "../components/wishlist.vue";
import cart from "../components/cart.vue";
import checkout from "../components/checkout.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/ProductPage/:productName",
        name: "ProductPage",
        component: ProductPage,
    },
    { path: "/Products", name: "Products", component: Product },
    { path: "/Men", name: "Men", component: Men },
    { path: "/Electronics", name: "Electronics", component: Electronics },
    { path: "/Wishlist", name: "Wishlist", component: wishlist },
    { path: "/Cart", name: "Cart", component: cart },
    { path: "/Checkout", name: "checkout", component: checkout },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).mount("#app");
