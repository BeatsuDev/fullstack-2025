import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { NavigationGuard } from "vue-router";

export async function layoutMiddleware(
    to: Parameters<NavigationGuard>[0],
    from: Parameters<NavigationGuard>[1],
    next: Parameters<NavigationGuard>[2]
) {
    if (!to.meta.layout) {
        to.meta.layoutComponent = DefaultLayout;
        return next();
    }
    
    try {
        import(`@/layouts/${to.meta.layout}.vue`)
            .then(() => to.meta.layoutComponent = DefaultLayout)
            .then(next);
    } catch (e) {
        to.meta.layoutComponent = DefaultLayout;
        next();
    }
}
