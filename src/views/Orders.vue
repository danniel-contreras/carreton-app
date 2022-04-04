<template>
  <Layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de ordenes</p>

    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="font-semibold text-xs">Buscar por codigo de orden</label>
        <input
          @keyup="search"
          v-model="code"
          placeholder="Escribe el codigo de orden"
          class="border rounded py-1 px-3 w-full text-xs"
        />
      </div>
     
      <div>
        <router-link
          class="float-right purple text-white w-32 h-7 text-center flex items-center rounded text-sm px-8"
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
    Pagination,
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
        this.currentPage = 0;
        this.pages = [];
        this.totalPag = 0;
        this.next = 0;
        this.prev = 0;
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
