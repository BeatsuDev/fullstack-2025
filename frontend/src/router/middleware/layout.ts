import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { NavigationGuard } from "vue-router";

export async function layoutMiddleware(
    to: Parameters<NavigationGuard>[0],
    from: Parameters<NavigationGuard>[1],
    next: Parameters<NavigationGuard>[2]
) {
    try {
        to.meta.layoutComponent = await import(
            `@/layouts/${to.meta.layout}.vue`
        );
    } catch (e) {
        to.meta.layoutComponent = DefaultLayout;
    }
    next();
}
