import { defineStore } from "pinia";
import { api } from "../boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";
import { useQuasar } from "quasar";

export const useLinkStore = defineStore("link", () => {
  const userStore = useUserStore();

  const links = ref([]);
  const $q = useQuasar();

  const createLink = async (longLink) => {
    try {
      $q.loading.show({
        delay: 400, // ms
      });
      const res = await api({
        method: "POST",
        url: "/links",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      // console.log(res.data);
      links.value.push(res.data.newLink);
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show({
        delay: 400, // ms
      });
      const res = await api({
        url: "/links/",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = res.data.links.map((item) => {
        return {
          _id: item._id,
          longLink: item.longLink,
          nanoLink: item.nanoLink,
        };
      });
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      $q.loading.hide();
    }
  };

  getLinks();

  const removeLink = async (_id) => {
    try {
      $q.loading.show({
        delay: 400, // ms
      });
      await api({
        url: `links/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = links.value.filter((item) => item._id !== _id);
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const modifiedLink = async (newLink) => {
    try {
      $q.loading.show({
        delay: 400, // ms
      });
      await api({
        url: `links/${newLink._id}`,
        method: "PATCH",
        headers: { Authorization: "Bearer " + userStore.token },
        data: { longLink: newLink.longLink },
      });
      links.value = links.value.map((item) =>
        item._id === newLink._id ? newLink : item
      );
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  return { createLink, links, getLinks, removeLink, modifiedLink };
});
