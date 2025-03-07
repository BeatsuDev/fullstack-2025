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
import createClient from "openapi-fetch";
import type { paths as ApiTypes } from "../types/api";
import type { ResponseCodesFor } from "@/types/helpers";
import { ref } from "vue";



const { history, addHistory } = useCalculationStore();
const display = ref("");

const ENDPOINT = "/calculate" as const satisfies keyof ApiTypes;
const client = createClient<ApiTypes>({ baseUrl: import.meta.env.VITE_API_BASE_URL });

async function evaluate(): Promise<void> {
    const { data, error, response } = await client.POST(ENDPOINT, {
        body: { expression: display.value },
    });

    const code = response.status as ResponseCodesFor<typeof ENDPOINT, "post">;

    // Set calculator display
    display.value = (() => {
        switch (code) {
            case 201:
                if (!data) throw new Error("Successful response code, but no data returned. This should never happen.");
                return data.result.toString();
            case 400:
                return "Error"
            case 401:
                return "Unauthorized"
            case 500:
                return "Server Error"
            default:
                code satisfies never;
                return "Unknown error";
        }
    })();

    // Handle actions based on response code
    switch (code) {
        case 201:
            if (!data) throw new Error("Successful response code, but no data returned. This should never happen.");
            return addHistory(`${data.expression} = ${data.result}`);
        case 400:
        case 401:
            if (!error) throw new Error("Received error code, but no error message. This should never happen.");
            console.error(error.message);
            return;
        case 500:
            return console.error("Unhandled internal server error:", response);
        default:
            code satisfies never; // Throws an error if not all cases are handled 
            throw new Error("Unhandled response code: " + code);
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