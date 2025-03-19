<template>
    <main id="register-view">
        <div id="register-container">
            <h1 id="register-title">Register</h1>
            <form @submit.prevent="register">
                <div>
                    <label for="username">Username</label>
                    <input id="username" v-model="formData.username" type="text" required
                        @keydown="() => showError.username = false" @blur="() => showError.username = true" />
                    <p cy-name-input-error style="color: red;"
                        v-if="showError.username && formattedError && formattedError.username">
                        {{ formattedError.username._errors[0] }}
                    </p>
                </div>
                <div>
                    <label for="display-name">Display name</label>
                    <input id="display-name" v-model="formData.displayName" type="text" required
                        @keydown="() => showError.displayName = false" @blur="() => showError.displayName = true" />
                    <p cy-name-input-error style="color: red;"
                        v-if="showError.displayName && formattedError && formattedError.displayName">
                        {{ formattedError.displayName._errors[0] }}
                    </p>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input id="password" v-model="formData.password" type="password" required
                        @keydown="() => showError.password = false" @blur="() => showError.password = true" />
                    <p cy-password-input-error style="color: red;"
                        v-if="showError.password && formattedError && formattedError.password">
                        {{ formattedError.password._errors[0] }}
                    </p>
                </div>
                <div>
                    <label for="repeat-password">Repeat password</label>
                    <input id="repeat-password" v-model="formData.repeatPassword" type="password" required
                        @keydown="() => showError.repeatPassword = false"
                        @blur="() => showError.repeatPassword = true" />
                    <p cy-password-input-error style="color: red;"
                        v-if="showError.repeatPassword && formattedError && formattedError.repeatPassword">
                        {{ formattedError.repeatPassword._errors[0] }}
                    </p>
                </div>
                <button type="submit" :disabled="!!formattedError">Register</button>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { z, type ZodFormattedError } from "zod";
import router from "@/router";

import type { components, paths } from "@/types/api"
import { useUserStore } from "@/stores/userStore";


const schema = z.object({
    username: z.string().nonempty("Username is required."),
    displayName: z.string().max(30, "Display name must be at most 30 characters long."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    repeatPassword: z.string().refine((data) => data === formData.password, {
        message: "Passwords do not match.",
    }),
});

const formData = reactive({
    username: "",
    displayName: "",
    password: "",
    repeatPassword: "",
});

const showError = reactive({
    username: false,
    displayName: false,
    password: false,
    repeatPassword: false,
});

const formattedError = computed<ZodFormattedError<typeof formData> | null>(() => {
    const result = schema.safeParse(formData);
    return result.error?.format() ?? null;
});

const userStore = useUserStore();
async function register() {
    const result = schema.safeParse(formData);

    if (!result.success) {
        showError.username = true;
        showError.displayName = true;
        showError.password = true;
        showError.repeatPassword = true;
        return;
    }

    try {
        const { repeatPassword, ...data } = formData;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/user", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data satisfies components["schemas"]["NewUserRequest"]),
        });

        if (response.ok) {
            const {jwtToken, ...userData} = await response.json() as paths["/user"]["post"]["responses"]["201"]["content"]["application/json"];
            userStore.login(userData, jwtToken);
            router.push({ name: "home" });
        } else {
            alert("Login failed!");
        }
    } catch (error) {
        console.error(error);
        alert("Network error. Is the backend server running?");
    }
}
</script>

<style scoped>
#register-view {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding-top: var(--spacing-12);
}

#register-container {
    background-color: var(--color-neutral-200);
    border: var(--spacing-1) solid black;
    padding: var(--spacing-4);
    grid-column: 2 / -2;
}

@media (min-width: 768px) {
    #register-container {
        grid-column: 3 / -3;
    }
}

@media (min-width: 1024px) {
    #register-container {
        grid-column: 4 / -4;
    }
}

@media (min-width: 1280px) {
    #register-container {
        grid-column: 5 / -5;
    }
}

form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

#register-title {
    text-align: center;
    font-size: var(--text-3xl);
    margin-block: var(--spacing-4);
}

input {
    width: 100%;
    padding: var(--spacing-2);
    margin-block: var(--spacing-2);
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
