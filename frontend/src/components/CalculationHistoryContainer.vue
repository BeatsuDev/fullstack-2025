<template>
    <div class="history-container">
        <h2 class="history-title">History</h2>
        <ul class="calculation-history-list">
            <li v-for="calculation in history" :key="calculation" class="calculation-history-list-element">
                {{ calculation }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    history: string[];
}>();
</script>

<style scoped>
.history-container {
    border: var(--spacing-1) solid var(--color-neutral-900);
    background-color: var(--color-neutral-400);
    display: flex;
    flex-direction: column;
}

.history-title {
    text-align: center;
    font-size: var(--text-4xl);
    font-weight: bold;
    margin: var(--spacing-2) auto;
}

.calculation-history-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2);
    margin: var(--spacing-4);
    padding: var(--spacing-1);
    background-color: var(--color-neutral-300);
    overflow-y: auto;
}
</style>