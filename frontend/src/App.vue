<template>
    <component :is="router.currentRoute.value.meta.layoutComponent">
        <RouterView />
    </component>
</template>

<script setup lang="ts">
import router from "@/router";
import { RouterView } from "vue-router";
</script>