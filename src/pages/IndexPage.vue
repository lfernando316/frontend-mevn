<template>
  <q-page padding>
    <add-link class="q-mb-xl" />
    <template v-for="link in useLink.links" :key="link._id">
      <link-card :link="link" />
    </template>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "../stores/link-store";

//components
import AddLink from "../components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";

const useLink = useLinkStore();
</script>
