import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCalculationStore = defineStore("calculation", () => {
    const calculationHistory = ref<string[]>([]);
    const history = computed(() => calculationHistory.value); // Read-only

    async function addHistory(value: string) {
        calculationHistory.value.push(value);
    }

    function clearHistory() {
        calculationHistory.value = [];
    }

    function setHistory(history: string[]) {
        calculationHistory.value = history;
    }

    return {
        history,
        addHistory,
        clearHistory,
        setHistory,
    };
});
