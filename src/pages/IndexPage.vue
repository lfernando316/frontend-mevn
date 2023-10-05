<template>
  <q-page padding>
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    <q-btn @click="userStore.logout">Cerrar sesión</q-btn>
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios.js";
import { useUserStore } from "../stores/user-store";

const userStore = useUserStore();

userStore.refreshToken();

const createLink = async () => {
  try {
    console.log(token.value, "Bearer token.value");
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink: "https://render.com/docs/static-outbound-ip-addresses",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
</script>
