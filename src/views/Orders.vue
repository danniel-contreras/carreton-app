<template>
  <Layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de ordenes</p>

    <div class="grid grid-cols-3 gap-4">
      <div class="flex flex-col">
        <label class="font-semibold text-xs">Buscar por codigo de orden</label>
        <input
          @keyup="search"
          v-model="code"
          placeholder="Escribe el codigo de orden"
          class="border rounded py-1 px-3 w-full text-xs"
        />
      </div>
      <div class="flex flex-col ml-5">
        <label class="font-semibold text-xs">Filtrar por estado</label>
        <div
          className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            :checked="status"
            class="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer"
            @click="changeValue"
          />
          <label
            htmlFor="toggle"
            class="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>
      <div>
        <router-link
          class="float-right bg-blue-600 text-white w-32 h-7 text-center flex items-center rounded text-sm px-8"
          to="new-order"
        >
          Nueva orden</router-link
        >
      </div>
    </div>
    <Table>
      <TableContent />
      <TableBody :orders="orders" />
    </Table>
     <pagination
      v-if="totalPag > 1"
      @method="getOrders"
      :currentPage="currentPage"
      :pages="pages"
      :totalPag="totalPag"
      :next="next"
      :prev="prev"
    />
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Table from "../components/Global/Table.vue";
import TableContent from "../components/Orders/TableContent.vue";
import TableBody from "../components/Orders/TableBody.vue";
import orders from "../services/orders";
import { paginate } from "../utils/utils";
import Pagination from "../components/Global/Pagination.vue";

export default {
  components: {
    Layout,
    Table,
    TableContent,
    TableBody,
    Pagination
  },
  data() {
    return {
      orders: [],
      status: false,
      code: "",
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      pages: [],
    };
  },
  methods: {
    getOrders(page = 1, status = 0, code = "") {
      orders.getOrders(page, status, code).then(({ data }) => {
        if (data.ok) {
          this.orders = data.orders;
          this.currentPage = data.curentPag;
          this.pages = paginate(data.curentPag, data.totalPag, 1);
          this.totalPag = data.totalPag;
          this.next = data.nextPag;
          this.prev = data.prevPag;
          return;
        }
        this.orders = [];
      });
    },
    changeValue() {
      this.value = !this.value;
      this.getOrders(1, this.value ? 1 : 0, "");
    },
    search() {
      this.getOrders(1, this.value ? 1 : 0, this.code);
    },
  },
  mounted() {
    this.getOrders(1, 0, "");
  },
};
</script>

<style>
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68d391;
}

.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68d391;
}
</style>
