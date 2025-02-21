<template>
    <div class="feedback-view">
        <div class="form-container">
            <h1 class="feedback-title">Give me some feedback!</h1>
            <form @submit.prevent="handleSubmitClick">
                <div>
                    <label for="name">Name:</label>
                    <input id="name" v-model="feedback.name" @keydown="showError.name = false" type="text"
                        @blur="showError.name = true" />
                    <div style="color: red;" v-if="showError.name && formattedError && formattedError.name">
                        {{ formattedError.name._errors[0] }}
                    </div>
                </div>
                <div>
                    <label for="text">Feedback:</label>
                    <textarea id="text" v-model="feedback.text" @keydown="showError.text = false"
                        @blur="showError.text = true"></textarea>
                    <div style="color: red;" v-if="showError.text && formattedError && formattedError.text">
                        {{ formattedError.text._errors[0] }}
                    </div>
                </div>
                <!-- This double bang trick (!!) uses JavaScript's type coercion to turn any variable to a boolean value -->
                <button type="submit" :disabled="!!formattedError">
                    Send feedback
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import { z, type ZodFormattedError } from "zod";

const schema = z.object({
    name: z.string().nonempty("Name is required."),
    text: z.string().min(20),
});

const feedback = reactive({
    name: "",
    text: "",
});

// Showing errors
const showError = ref({
    name: false,
    text: false,
});

const formattedError = computed<ZodFormattedError<typeof feedback> | null>(() => {
    const result = schema.safeParse(feedback);
    return result.error?.format() ?? null;
});

// Submitting
async function handleSubmitClick() {
    const result = schema.safeParse(feedback);

    if (!result.success) {
        showError.value = {
            name: true,
            text: true,
        };
        return;
    }

    try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/feedback", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: feedback.name,
                feedback: feedback.text,
            }),
        });

        if (response.ok) {
            alert("Feedback sent!");
        } else {
            alert("Failed to send feedback.");
        }
    } catch (error) {
        console.error(error);
        alert("Network error. Is the backend server running?");
        return;
    }
}
</script>

<style scoped>
.feedback-view {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding-top: var(--spacing-8);
}

.form-container {
    background-color: var(--color-neutral-200);
    border: var(--spacing-1) solid black;
    padding: var(--spacing-4);
    grid-column: 2 / -2;
}

@media (min-width: 768px) {
    .form-container {
        grid-column: 3 / -3;
    }
}

@media (min-width: 1024px) {
    .form-container {
        grid-column: 4 / -4;
    }
}

@media (min-width: 1280px) {
    .form-container {
        grid-column: 5 / -5;
    }
}

.feedback-title {
    text-align: center;
    font-size: var(--text-3xl);
    margin-block: var(--spacing-4);
}

form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

input#name,
textarea#text {
    width: 100%;
    padding: var(--spacing-2);
    border-bottom: 2px solid var(--color-neutral-700);
    background-color: var(--color-neutral-50);
}

button {
    border: 1px solid black;
    padding: var(--spacing-4);
}

button:disabled {
    background-color: var(--color-neutral-500);
    cursor: not-allowed;
}

button:not(:disabled) {
    background-color: var(--color-primary-400);
}

button:not(:disabled):hover {
    background-color: var(--color-primary-500);
}
</style>