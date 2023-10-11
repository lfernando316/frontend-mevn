<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Ingrese link aqui"
      :rules="[(val) => (val && val.trim() != '') || 'EScribe algo por favor']"
    >
    </q-input>
    <q-btn
      class="q-mt-sm full-width"
      label="Agregar"
      color="primary"
      type="submit"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useLinkStore } from "../stores/link-store";
import { useNotify } from "../componsables/notifyHook";

const useLink = useLinkStore();
const { showNotify } = useNotify();
const link = ref("");
const loading = ref(false);

const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify("Link agregado con éxito", "green");
    link.value = "";
  } catch (error) {
    console.log(error.errors);
    if (error.errors) {
      return error.errors.forEach((item) => {
        showNotify(item.msg);
      });
    }
    showNotify(error);
  } finally {
    loading.value = false;
  }
};
</script>
