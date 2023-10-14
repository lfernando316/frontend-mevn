<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Login</h3>
      <q-form @submit.prevent="handleSubmit">
        <q-input
          v-model="email"
          type="text"
          label="Ingrese correo electrónico"
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escriba algo',
            (val) =>
              /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
              'Formato Email incorrecto',
          ]"
          lazy-rules
        />
        <q-input
          v-model="password"
          type="password"
          label="Ingrese contraseña"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Contraseña mayor a 6 carácteres',
          ]"
          lazy-rules
        />
        <div>
          <q-btn color="primary" label="Login" type="submit" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
const $q = useQuasar();

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    await userStore.access(email.value, password.value);
    router.push("/");
    email.value = "";
    password.value = "";
  } catch (error) {
    console.log(error);
    if (error.error) {
      alertDialogBackend(error.error);
    } else if (error.errors[0].msg) {
      alertDialogBackend(error.errors[0].msg);
    } else {
      alertDialogBackend();
    }
  }
};
const alertDialogBackend = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>
