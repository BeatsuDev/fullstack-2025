<template>
    <main>
        <BasicCalculator class="calculator-component" v-model="display" @evaluate="evaluate" />
        <CalculationHistoryContainer class="history-component" :history="history" />
    </main>
</template>

<script setup lang="ts">
import BasicCalculator from "@/components/BasicCalculator.vue";
import CalculationHistoryContainer from "@/components/CalculationHistoryContainer.vue";
import { ref } from "vue";

const history = ref<string[]>([]);
const display = ref("");

function evaluate() {
    try {
        const result = eval(display.value);

        if (result === Infinity || isNaN(result)) {
            throw new Error("Invalid calculation");
        }

        history.value.push(`${display.value} = ${result}`);
        display.value = result.toString();
    } catch (e) {
        display.value = "Error";
    }
}
</script>

<style scoped>
main {
    display: grid;
    grid-template-columns: 1fr;
    padding: var(--spacing-4);
    gap: var(--spacing-4);
    height: calc(1000px + var(--spacing-4) * 3);
}

@media (min-width: 768px) {
    main {
        grid-template-columns: repeat(2, 1fr);
        height: calc(500px + var(--spacing-4) * 2);
    }
}

main>div {
    min-height: 0;
    height: 100%;
}
</style>