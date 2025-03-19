import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { components } from "@/types/api";

export const useUserStore = defineStore("user", () => {
    const userData = ref<components["schemas"]["User"] | null>(null);
    const jwtTokenData = ref<string | null>(null);
    
    const user = computed(() => userData.value);
    const jwtToken = computed(() => jwtTokenData.value);
    const isAuthenticated = computed(() => !!user.value && !!jwtToken.value);

    function logout() {
        userData.value = null;
        jwtTokenData.value = null;
    }

    function login(newUserData: components["schemas"]["User"], jwtToken: string) {
        userData.value = newUserData;
        jwtTokenData.value = jwtToken;
    }

    return {
        user,
        jwtToken,
        isAuthenticated,
        login,
        logout,
    };
});
