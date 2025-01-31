import { computed } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const themeStore = defineStore("theme", () => {
    const preference = useLocalStorage<"light" | "dark" | null>("theme", null);
    const theme = computed(() => preference.value || getSystemTheme());

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }

    function setPreference(value: "light" | "dark") {
        preference.value = value;
    }

    function removePreference() {
        preference.value = null;
    }

    function toggleTheme() {
        preference.value = theme.value === "dark" ? "light" : "dark";
    }

    return { setPreference, removePreference, theme, toggleTheme };
});
