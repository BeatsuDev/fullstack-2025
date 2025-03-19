<template>
    <nav>
        <RouterLink to="/" class="link" active-class="active-link">Calculator</RouterLink>
        <RouterLink to="/feedback" class="link" active-class="active-link">Feedback</RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/login" class="link" active-class="active-link">Login</RouterLink>
        <RouterLink v-if="!userStore.isAuthenticated" to="/register" class="link" active-class="active-link">Register</RouterLink>
        <button v-if="userStore.isAuthenticated" @click="userStore.logout" class="link">Logout</button>
    </nav>
    <main>
        <slot></slot>
    </main>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
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
