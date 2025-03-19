<template>
    <main id="login-view">
        <div id="login-container">
            <h1 id="login-title">Login</h1>
            <form @submit.prevent="login">
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
                    <label for="password">Password</label>
                    <input id="password" v-model="formData.password" type="password" required
                        @keydown="() => showError.password = false" @blur="() => showError.password = true" />
                    <p cy-password-input-error style="color: red;"
                        v-if="showError.password && formattedError && formattedError.password">
                        {{ formattedError.password._errors[0] }}
                    </p>
                </div>
                <button type="submit" :disabled="!!formattedError">Login</button>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { z, type ZodFormattedError } from "zod";
import router from "@/router";
import { useUserStore } from "@/stores/userStore";
import type { components, paths } from "@/types/api"


const schema = z.object({
    username: z.string().nonempty("Username is required."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

const formData = reactive({
    username: "",
    password: "",
});

const showError = reactive({
    username: false,
    password: false,
});

const formattedError = computed<ZodFormattedError<typeof formData> | null>(() => {
    const result = schema.safeParse(formData);
    return result.error?.format() ?? null;
});

const userStore = useUserStore();
async function login() {
    const result = schema.safeParse(formData);

    if (!result.success) {
        showError.username = true;
        showError.password = true;
        return;
    }

    try {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + "/user/token", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const { jwtToken, ...userData } = await response.json() as paths["/user/token"]["post"]["responses"]["201"]["content"]["application/json"];
            userStore.login(userData, jwtToken);
            await router.push({ name: "home"});
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
#login-view {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    padding-top: var(--spacing-12);
}

#login-container {
    background-color: var(--color-neutral-200);
    border: var(--spacing-1) solid black;
    padding: var(--spacing-4);
    grid-column: 2 / -2;
}

@media (min-width: 768px) {
    #login-container {
        grid-column: 3 / -3;
    }
}

@media (min-width: 1024px) {
    #login-container {
        grid-column: 4 / -4;
    }
}

@media (min-width: 1280px) {
    #login-container {
        grid-column: 5 / -5;
    }
}

form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
}

#login-title {
    text-align: center;
    font-size: var(--text-3xl);
    margin-block: var(--spacing-4);
}

input#username,
input#password {
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
