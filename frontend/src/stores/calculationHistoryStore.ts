import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCalculationHistory = defineStore("calculationHistory", () => {
    const calculationHistory = ref<string[]>([]);
    const history = computed(() => calculationHistory.value); // Read-only

    function addHistory(value: string) {
        calculationHistory.value.push(value);
    }

    function clearHistory() {
        calculationHistory.value = [];
    }

    return {
        history,
        addHistory,
        clearHistory,
    };
});
