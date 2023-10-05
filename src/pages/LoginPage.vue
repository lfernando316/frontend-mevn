<template>
  <h3>Login {{ userStore.token }}</h3>
</template>
useUserStore
<script setup>
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();
</script>
