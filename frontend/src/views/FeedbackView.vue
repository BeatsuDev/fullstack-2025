<template>
    <div class="mx-auto m-4 w-11/12 md:w-1/2 lg:w-2/5">
        <h1 class="text-center text-2xl my-8">Give me some feedback!</h1>

        <ValidatedForm
            v-model="feedback"
            :schema="schema"
            @submit="submitFeedback"
        >
            <FormGroup label="Name">
                <FormInput v-model="feedback.name" />
            </FormGroup>

            <FormGroup label="Feedback">
                <FormTextArea v-model="feedback.text" />
            </FormGroup>

            <FormButton>Submit</FormButton>
        </ValidatedForm>
    </div>
</template>

<script setup lang="ts">
import ValidatedForm from "@/components/form-elements/ValidatedForm.vue";
import FormButton from "@/components/form-elements/FormButton.vue";
import FormGroup from "@/components/form-elements/FormGroup.vue";
import FormInput from "@/components/form-elements/FormInput.vue";
import FormTextArea from "@/components/form-elements/FormTextArea.vue";

import { reactive } from "vue";
import { z } from "zod";

const schema = z.object({
    name: z.string().nonempty(),
    text: z.string().min(20),
});

const feedback = reactive({
    name: "",
    text: "",
});

function submitFeedback() {
    alert("Feedback submitted!");
}
</script>
