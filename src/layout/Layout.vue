<template>
  <div class="w-screen h-screen flex">
    <div class="w-80 p-6 h-full bg-gray-800">
      <NavBar />
    </div>
    <div class="fixed ml-80 p-16 w-full">
      <slot />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/Layout/Navbar.vue";

export default {
  name: "Layout",
  components: {
    NavBar,
  },
};
</script>

<style></style>
