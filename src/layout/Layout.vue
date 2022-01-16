<template>
  <div class="w-screen h-screen flex">
    <div class="w-80 p-6 h-full linear-gradient">
      <NavBar />
    </div>
    <div class="fixed ml-80 p-16 w-9/12">
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

<style>
.linear-gradient{
  background: linear-gradient(180deg, #23023c 0%, #000000 100%);
}
</style>
