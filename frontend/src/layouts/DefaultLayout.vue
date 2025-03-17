<template>
    <nav>
        <RouterLink v-for="(route, index) in navigationRoutes" :key="index" :to="route.path" class="link"
            active-class="active-link">
            {{ route.text }}
        </RouterLink>
    </nav>
    <main>
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
// as const is a Typescript feature. If you hover over route.text, you'll see that it's of type
// "Calculator" | "Feedback" because we're telling Typescript that the array will never change.
const navigationRoutes = [
    { path: "/", text: "Calculator" },
    { path: "/feedback", text: "Feedback" },
] as const; 
</script>

<style scoped>
nav {
    display: flex;
    justify-content: center;
    gap: var(--spacing-8);

    font-size: var(--text-3xl);
    color: var(--color-neutral-50);
    background-color: var(--color-neutral-700);

    padding: var(--spacing-4);
    width: 100%;
}

.link {
    transition: color 150ms;
}

/* The link at which the router is currently at */
.active-link {
    color: var(--color-primary-500);
}
</style>