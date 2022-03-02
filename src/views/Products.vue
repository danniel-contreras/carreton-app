<template>
  <Layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de productos</p>
    <div class="flex w-full mt-3">
      <div class="flex">
        <label class="text-gray-500 text-xs pt-1 font-semibold font-mono mr-2"
          >Buscar</label
        >
        <div class="relative flex text-gray-600 focus-within:text-gray-400">
          <input-icon />
          <input
            @keyup="search"
            placeholder="Escribe para buscar..."
            v-model="name"
            class="w-96 py-1 text-xs pl-10 rounded border outline-none"
          />
        </div>
      </div>

      <button
        @click="showModal"
        class="purple mr-auto ml-40 text-white px-8 text-sm py-1 rounded"
      >
        Agregar
      </button>
    </div>
    <Table>
      <TableContent />
      <TableBody @getProducts="getProducts" :products="products" />
    </Table>
    <pagination
      v-if="totalPag > 1"
      @method="getProducts"
      :currentPage="currentPage"
      :pages="pages"
      :totalPag="totalPag"
      :next="next"
      :prev="prev"
    />
    <modal v-show="visible" title="Agregar nuevo producto" @close="closeModal">
      <Form @getProducts="getProducts" @close="closeModal" />
    </modal>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Form from "../components/Product/ProductForm.vue";
import Modal from "../components/Global/Modal.vue";
import InputIcon from "../components/Global/InputIcon.vue";
import Table from "../components/Global/Table.vue";
import TableContent from "../components/Product/TableContent.vue";
import TableBody from "../components/Product/TableBody.vue";
import product from "../services/product";
import { paginate } from "../utils/utils";
import Pagination from "../components/Global/Pagination.vue";

export default {
  name: "Products",
  components: {
    Layout,
    Modal,
    Form,
    Table,
    TableContent,
    TableBody,
    "input-icon": InputIcon,
    Pagination,
  },
  data() {
    return {
      visible: false,
      products: Array,
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      pages: [],
      name: "",
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    getProducts(page = 1, name = "") {
      product.getPaginates(page, name).then(({ data }) => {
        if (data.ok) {
          this.products = data.products;
          this.currentPage = data.curentPag;
          this.pages = paginate(data.curentPag, data.totalPag, 1);
          this.totalPag = data.totalPag;
          this.next = data.nextPag;
          this.prev = data.prevPag;
        }
      });
    },
    search() {
      this.getProducts(1, this.name);
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style></style>
