<template>
  <div class="flex flex-col justify-center items-center w-full">
    <p class="text-3xl text-white font-bold font-mono mt-6">Yaye Store</p>
    <img class="w-40 mt-4" src="../../assets/logo.png" />
    <div class="mt-4">
      <ul>
        <li class="text-white font-semibold text-lg font-mono">
          <router-link to="/products">
            <font-awesome-icon icon="ice-cream" /> Productos
          </router-link>
        </li>
        <li class="text-white font-semibold text-lg font-mono">
          <font-awesome-icon icon="user-alt" /> Mi Cuenta
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style></style>
