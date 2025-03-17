import { createRouter, createWebHistory } from "vue-router";
import { layoutMiddleware } from "./middleware/layout";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/feedback",
            name: "feedback",
            component: () => import("../views/FeedbackView.vue"),
        },
    ],
});

router.beforeEach(layoutMiddleware);

export default router;
