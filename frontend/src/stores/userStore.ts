import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { components } from "@/types/api";

export const useUserStore = defineStore("user", () => {
    const user = ref<components["schemas"]["User"] | null>(null);
    const token = ref<string | null>(null);
    
    const isAuthenticated = computed(() => !!user.value);
    const jwtToken = computed(() => token.value);

    function logout() {
        user.value = null;
        token.value = null;
    }

    function login(userData: components["schemas"]["User"], jwtToken: string) {
        user.value = userData;
        token.value = jwtToken;
    }

    return {
        jwtToken,
        isAuthenticated,
        login,
        logout,
    };
});
