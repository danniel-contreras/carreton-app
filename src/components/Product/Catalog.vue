<template>
  <div class="w-100 h-100 grid grid-cols-3 gap-7">
    <div
      v-for="product in products"
      v-bind:key="product.id"
      class="rounded shadow border flex justify-center flex-col p-5"
    >
      <p class="font-mono font-semibold">{{ product.name }}</p>
      <p class="font-small font-mono mt-1">{{ product.typeProduct.type }}</p>
      <span class="font-mono text-green-500 font-xs font-semibold"
        >${{ product.price }}</span
      >
      <button
        @click="add(product)"
        class="bg-blue-500 text-white rounded-md font-small py-1 mt-2"
      >
        Agregar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array },
    addCart: { type: Function },
  },
  methods: {
    add(prod) {
      const nw = {
        quantity: 1,
        id: prod.id,
        price: prod.price,
        name: prod.name,
        total_price: prod.price,
      };
      this.$emit("addCart", nw);
      this.$toast.info(`Se agrego al carrito!`, {
        position: "bottom-right",
      });
    },
  },
};
</script>

<style>
.font-small {
  font-size: 11px;
}
</style>
