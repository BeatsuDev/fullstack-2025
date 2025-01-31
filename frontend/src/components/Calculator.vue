<template>
    <div
        class="border-2 border-gray-800 bg-gray-700 grid grid-cols-4 gap-2 p-2"
    >
        <div
            id="display"
            class="h-16 col-span-full bg-gray-300 flex justify-end items-center p-2 text-3xl font-semibold"
        >
            {{ display }}
        </div>
        <button
            v-for="button in buttons"
            :key="button.id"
            :id="button.id"
            @click="
                button.callback ? button.callback() : (display += button.value)
            "
            :class="`h-16 text-2xl bg-gray-300 ${button.class}`"
        >
            {{ button.value }}
        </button>
    </div>
</template>

<script setup lang="ts">
const display = defineModel<string>({ default: "" });
const buttons = [
    {
        id: "clear",
        value: "AC",
        class: "!bg-red-500",
        callback: () => emit("clear"),
    },
    { id: "open-paren", value: "(", class: "!bg-gray-400" },
    { id: "close-paren", value: ")", class: "!bg-gray-400" },
    { id: "divide", value: "/", class: "!bg-gray-400" },
    { id: "seven", value: "7", class: "" },
    { id: "eight", value: "8", class: "" },
    { id: "nine", value: "9", class: "" },
    { id: "multiply", value: "*", class: "!bg-gray-400" },
    { id: "four", value: "4", class: "" },
    { id: "five", value: "5", class: "" },
    { id: "six", value: "6", class: "" },
    { id: "subtract", value: "-", class: "!bg-gray-400" },
    { id: "one", value: "1", class: "" },
    { id: "two", value: "2", class: "" },
    { id: "three", value: "3", class: "" },
    { id: "add", value: "+", class: "!bg-gray-400" },
    { id: "decimal", value: ".", class: "!bg-gray-400" },
    { id: "zero", value: "0", class: "" },
    {
        id: "equals",
        value: "=",
        class: "!bg-green-500 col-span-2",
        callback: () => emit("evaluate", display.value),
    },
];

const emit = defineEmits<{
    clear: [];
    evaluate: [value: string];
}>();
</script>
