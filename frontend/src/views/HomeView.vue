<template>
    <main>
        <BasicCalculator class="calculator-component" v-model="display" @evaluate="evaluate" />
        <CalculationHistoryContainer class="history-component" :history="history" />
    </main>
</template>

<script setup lang="ts">
import BasicCalculator from "@/components/BasicCalculator.vue";
import CalculationHistoryContainer from "@/components/CalculationHistoryContainer.vue";
import { useCalculationStore } from "@/stores/calculationStore";
import type { Calculation, CalculationError } from "@/types/api";
import { ref } from "vue";

const { history, addHistory } = useCalculationStore();
const display = ref("");

async function evaluate() {
    const calculationEndpoint = import.meta.env.VITE_API_BASE_URL + "/calculate";
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: 2 }),
    };

    const response = await fetch(calculationEndpoint, requestOptions);

    if (!response.ok) {
        const data: CalculationError = await response.json();
        display.value = data.error;
        return;
    }

    const data: Calculation = await response.json();
    display.value = data.result.toString();

    addHistory(`${data.expression} = ${data.result}`);
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