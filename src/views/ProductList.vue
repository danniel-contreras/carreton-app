<template>
  <Layout>
    <p class="font-mono font-semibold text-xl mb-5">
      Lista de productos disponibles
    </p>
    <div class="flex mt-4">
      <span class="font-semibold font-mono text-xl"
        >Total: ${{ reduceAll(order) }}</span
      >
      <button
        @click="realize"
        class="purple rounded text-xs text-white py-2 px-8 ml-20"
      >
        Realizar
      </button>
    </div>
    <div class="grid grid-cols-3 gap-4 mt-8">
      <ul>
        <li class="bg-gray-900 text-white font-mono text-center py-2">
          Sorbetes
        </li>
        <li
          class="text-white font-mono text-center py-2"
          v-for="(sorbete, index) in sorbetes"
          v-bind:key="sorbete.id"
          :class="index % 2 === 0 ? `bg-gray-700` : `bg-gray-800`"
        >
          {{ sorbete.name }}
          <input
            class="w-5 h-5 ml-6 pt-1"
            type="checkbox"
            :id="`input-sorbete` + index"
            :value="{ id: sorbete.id, price: sorbete.price, quantity: 1 }"
            v-model="order"
          />
        </li>
      </ul>
      <ul>
        <li class="bg-gray-800 text-white font-mono text-center py-2">
          Jaleas
        </li>
        <li
          class="text-white font-mono text-center py-2"
          v-for="(jalea, index) in jaleas"
          v-bind:key="jalea.id"
          :class="index % 2 === 0 ? `bg-gray-600` : `bg-gray-700`"
        >
          {{ jalea.name }}
          <input
            class="w-5 h-5 ml-6 pt-1"
            type="checkbox"
            :id="`input-jalea` + index"
            :value="{ id: jalea.id, price: jalea.price, quantity: 1 }"
            v-model="order"
          />
        </li>
      </ul>
      <ul>
        <li class="bg-gray-700 text-white font-mono text-center py-2">
          Toppings
        </li>
        <li
          class="text-white font-mono text-center py-2"
          v-for="(top, index) in toppings"
          v-bind:key="top.id"
          :class="index % 2 === 0 ? `bg-gray-500` : `bg-gray-600`"
        >
          {{ top.name }}
          <input
            class="w-5 h-5 ml-6 pt-1"
            type="checkbox"
            :id="`input-top` + index"
            :value="{ id: top.id, price: top.price, quantity: 1 }"
            v-model="order"
          />
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import product from "../services/product";
import order from "../services/orders";
import { reduceTotal } from "../utils/filters";
import { filterJaleas, filterSorbetes, filterToppings } from "../utils/filters";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      jaleas: [],
      toppings: [],
      sorbetes: [],
      order: [],
    };
  },
  methods: {
    reduceAll: reduceTotal,
    getProducts(page = 1, name = "") {
      product.getPaginates(page, name,10000).then(({ data }) => {
        if (data.ok) {
          this.sorbetes = filterSorbetes(data.products);
          this.jaleas = filterJaleas(data.products);
          this.toppings = filterToppings(data.products);
        }
      });
    },
    realize() {
      order.newOrder(this.order).then(() => {
        this.$toast.info(`Se realizo la compra!`, {
          position: "bottom-right",
        });
        this.order = [];
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style></style>
