<template>
    <div class="calculator-container">
        <div id="display" class="calculator-display">
            {{ display }}
        </div>
        <button v-for="button in buttons" :key="button.id" :id="button.id" class="calculator-button"
            :style="button.styles ?? {}" @click="button.callback ? button.callback() : (display += button.value)">
            {{ button.value }}
        </button>
    </div>
</template>

<script setup lang="ts">
const display = defineModel<string>({ default: "" });

const emit = defineEmits<{
    clear: [];
    evaluate: [value: string];
}>();

function clearCallback() {
    display.value = "";
    emit("clear");
}

const buttons = [
    {
        id: "clear",
        value: "AC",
        styles: { backgroundColor: "red" },
        callback: clearCallback,
    },
    { id: "open-paren", value: "(", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "close-paren", value: ")", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "divide", value: "/", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "seven", value: "7" },
    { id: "eight", value: "8" },
    { id: "nine", value: "9" },
    { id: "multiply", value: "*", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "four", value: "4" },
    { id: "five", value: "5" },
    { id: "six", value: "6" },
    { id: "subtract", value: "-", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "one", value: "1" },
    { id: "two", value: "2" },
    { id: "three", value: "3" },
    { id: "add", value: "+", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "decimal", value: ".", styles: { backgroundColor: "var(--color-neutral-400)" } },
    { id: "zero", value: "0" },
    {
        id: "equals",
        value: "=",
        styles: { backgroundColor: "var(--color-primary-400)", gridColumn: "span 2" },
        callback: () => emit("evaluate", display.value),
    },
];
</script>

<style scoped>
.calculator-container {
    border: var(--spacing-2) solid var(--color-neutral-800);
    background-color: var(--color-neutral-700);

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-2);
    padding: var(--spacing-2);
}

.calculator-display {
    height: var(--spacing-16);
    background-color: var(--color-neutral-300);

    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: var(--spacing-2);

    font-size: var(--text-3xl);
    font-weight: semibold;

    grid-column: 1 / -1;
}

.calculator-button {
    background-color: var(--color-neutral-300);
    height: var(--spacing-16);
    font-size: var(--text-2xl);
}
</style>
