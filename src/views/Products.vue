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
          <input class="w-96 py-1 text-xs pl-10 rounded border outline-none" />
        </div>
      </div>

      <button
        @click="showModal"
        class="purple-color mr-auto ml-40 text-white px-8 text-sm py-1 rounded"
      >
        Agregar
      </button>
    </div>
    <Table>
      <TableContent />
      <TableBody @getProducts="getProducts" :products="products" />
    </Table>
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
  },
  data() {
    return {
      visible: false,
      products: Array,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    getProducts() {
      product.getProducts().then((res) => {
        if (res.data.ok) {
          this.products = res.data.products;
        }
      });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style></style>
