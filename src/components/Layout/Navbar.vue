<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-col justify-center items-center">
      <p class="text-3xl text-white font-bold font-mono mt-6">Yaye Store</p>
      <img class="w-40 mt-4" src="../../assets/logo.png" />
    </div>
    <div class="ml-6">
      <div class="mt-4">
        <ul>
          <li class="text-white font-semibold mt-2 text-lg font-mono">
            <div class="flex items-center text-base">
              <span
                @click="showProductDpw"
                class="text-gray-300 text-lg cursor-pointer"
              >
                <font-awesome-icon icon="ice-cream" />
                Productos
                <font-awesome-icon v-if="!showProduct" icon="chevron-down" />
                <font-awesome-icon v-if="showProduct" icon="chevron-up" />
                <ul
                  :class="showProduct ? `block` : `hidden`"
                  class="transition-all duration-700 text-white px-6"
                >
                  <li class="text-base font-medium">
                    <router-link to="/products"
                      >- Tipos de producto
                    </router-link>
                  </li>
                  <li class="text-base font-medium">
                    <router-link to="/products">- Productos </router-link>
                  </li>
                </ul>
              </span>
            </div>
          </li>
          <li class="text-white font-semibold mt-2 text-lg font-mono">
            <font-awesome-icon icon="user-alt" /> Mi Cuenta
          </li>
          <li
            @click="loggout"
            class="text-white mt-2 font-semibold text-lg font-mono cursor-pointer"
          >
            <font-awesome-icon icon="sign-out-alt" /> Cerrar Sesion
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showProduct: false,
    };
  },
  methods: {
    loggout() {
      this.$store.dispatch("setLoggout");
      this.$router.go("/login");
    },
    showProductDpw() {
      this.showProduct = !this.showProduct;
    },
  },
};
</script>

<style></style>
