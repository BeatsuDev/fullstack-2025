<template>
    <div class="mx-auto m-4 w-11/12 md:w-1/2 lg:w-2/5">
        <h1 class="text-center text-2xl my-8">Give me some feedback!</h1>
        <form @submit.prevent="handleSubmitClick" class="flex flex-col gap-4 px-4 pt-16 pb-32 bg-primary-400">
            <div>
                <label for="name" class="block">Name:</label>
                <input id="name" class="w-full p-2" v-model="feedback.name" @keydown="showError.name = false"
                    type="text" @blur="showError.name = true" />
                <div class="text-red-500" v-if="showError.name && formattedError && formattedError.name">
                    {{ formattedError.name._errors[0] }}
                </div>
            </div>
            <div>
                <label for="text" class="block">Feedback:</label>
                <textarea id="text" class="w-full p-2" v-model="feedback.text" @keydown="showError.text = false"
                    @blur="showError.text = true"></textarea>
                <div class="text-red-500" v-if="showError.text && formattedError && formattedError.text">
                    {{ formattedError.text._errors[0] }}
                </div>
            </div>
            <button type="submit" class="border border-black p-4" :class="{
                'bg-secondary-500 hover:bg-blue-700': formattedError === null,
                'bg-gray-500 cursor-not-allowed': formattedError !== null,
            }">
                Send feedback
            </button>
        </form>
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
function handleSubmitClick() {
    const result = schema.safeParse(feedback);

    if (result.success) {
        alert("Feedback submitted!" + JSON.stringify(result.data));
    } else {
        showError.value = {
            name: true,
            text: true,
        };
    }
}
</script>
