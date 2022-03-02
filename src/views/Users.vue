<template>
  <layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de usuarios</p>
  </layout>
</template>

<script>
import Layout from "@/layout/Layout.vue";
import user from "../services/user";
export default {
  name: "Users",
  components: {
    Layout,
  },
  data() {
    return {
      users: [],
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      pages: [],
    };
  },
  methods: {
    getUsers() {
      user.getUsersPaginate().then(({ data }) => {
        console.log(data);
      });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
