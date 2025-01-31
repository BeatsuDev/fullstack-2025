<template>
    <main class="grid grid-cols-1 md:grid-cols-2 p-4">
        <Calculator v-model="display" @evaluate="evaluate" @clear="clear" class="m-4" />
        <div>
            <h2 class="text-center text-4xl font-bold">History</h2>
            <ul>
                <li v-for="calculation in history" :key="calculation" class="text-center text-lg">
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

const history = ref<string[]>([]);
</script>
