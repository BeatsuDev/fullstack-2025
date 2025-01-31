<template>
    <nav
        class="w-full bg-gray-700 p-4 text-white text-3xl flex justify-center gap-8"
    >
        <RouterLink
            v-for="(route, index) in navigationRoutes"
            :key="index"
            :to="route.path"
            class="duration-150"
            active-class="text-primary-500"
        >
            {{ route.text }}
        </RouterLink>
    </nav>
    <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";

const navigationRoutes = [
    { path: "/", text: "Calculator" },
    { path: "/feedback", text: "Feedback" },
] as const;
</script>
