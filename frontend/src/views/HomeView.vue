<template>
    <main>
        <Calculator v-model="display" @evaluate="evaluate" @clear="clear" />
        <div class="history-container">
            <h2 class="history-title">History</h2>
            <ul class="calculation-history-list">
                <li v-for="calculation in history" :key="calculation" class="calculation-history-list-element">
                    {{ calculation }}
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup lang="ts">
import Calculator from "@/components/Calculator.vue";
import { ref } from "vue";

const display = ref("");

function evaluate() {
    try {
        const result = eval(display.value);

        if (result === Infinity || isNaN(result)) {
            throw new Error("Invalid calculation");
        }

        history.value.push(`${display.value} = ${result}`);
        display.value = result;
    } catch (e) {
        display.value = "Error";
    }

}

function clear() {
    display.value = "";
}

const history = ref<string[]>(["test"]);
</script>

<style scoped>
main {
    display: grid;
    grid-template-columns: 1fr;
    padding: var(--spacing-4);
    gap: var(--spacing-4);
}

@media (min-width: 768px) {
    main {
        grid-template-columns: repeat(2, 1fr);
    }
}

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
}
</style>