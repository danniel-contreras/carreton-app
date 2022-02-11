<template>
  <div
    v-bind:class="{ hidden: !dropdownPopoverShow, block: dropdownPopoverShow }"
    class="bg-gray-200 w-96 absolute -right-16 text-base z-50 p-4 list-none top-10 text-left border rounded shadow-lg mt-1"
    style="max-width: 20rem"
    ref="popoverDropdownRef"
  >
    <p class="font-mono text-xs px-5" v-if="!cart || cart.length <= 0">
      No hay productos
    </p>
    <p class="font-mono w-full border-b border-gray-300 font-semibold" v-else>
      Productos a comprar
    </p>
    <ul>
      <li class="flex" v-for="pd in cart" v-bind:key="pd.id">
        <span
          class="font-mono flex whitespace-nowrap text-xs font-semibold px-4 py-1 mt-2"
        >
          {{ pd.quantity }} - {{ pd.name }} - ${{ Number(pd.total_price) }}
        </span>
        <font-awesome-icon
          class="text-red-500 cursor-pointer text-2xl py-1 mt-2"
          icon="times"
          @click="remove(pd)"
        />
      </li>
    </ul>
    <button
      @click="realize"
      v-if="cart && cart.length > 0"
      class="bg-green-500 text-white rounded text-xs py-1 w-full mt-2"
    >
      Realizar
    </button>
  </div>
</template>

<script>
import order from "../../services/orders";

export default {
  props: {
    dropdownPopoverShow: {
      type: Boolean,
    },
    removeCart: { type: Function },
    cart: { type: Array },
    clearCart:{type:Function}
  },
  methods: {
    remove(item) {
      this.$emit("removeCart", item);
    },
    realize() {
      order.newOrder(this.cart).then(() => {
        this.$toast.info(`Se realizo la compra!`, {
        position: "bottom-right",
      });
        this.$emit("clearCart");
      });
    },
  },
};
</script>

<style></style>
