<template>
  <Layout>
    <p class="text-2xl font-thin font-mono text-gray-700">
      Lista de tipos de producto
    </p>
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
            v-model="type"
            class="w-96 py-1 text-xs pl-10 rounded border outline-none"
          />
        </div>
      </div>

      <button
        @click="showModal"
        class="float-right bg-blue-600 ml-40 text-white rounded py-1 text-sm px-8"
      >
        Agregar
      </button>
    </div>
    <Table>
      <TableContent />
      <TableBody @getTypes="getTypes" :types="types" />
    </Table>
    <pagination
      v-if="totalPag > 1"
      @method="getTypes"
      :currentPage="currentPage"
      :pages="pages"
      :totalPag="totalPag"
      :next="next"
      :prev="prev"
    />
    <Modal
      v-show="isVisible"
      @close="closeModal"
      title="Agregar tipo de producto"
    >
      <TypeForm @getTypes="getTypes" @close="closeModal" />
    </Modal>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Table from "../components/Global/Table.vue";
import Modal from "../components/Global/Modal.vue";
import TableContent from "../components/ProductType/TableContent.vue";
import TableBody from "../components/ProductType/TableBody.vue";
import TypeForm from "../components/ProductType/TypeForm.vue";
import product_type from "../services/type-product";
import InputIcon from "../components/Global/InputIcon.vue";
import Pagination from "../components/Global/Pagination.vue";
import { paginate } from "../utils/utils";

export default {
  components: {
    Layout,
    Table,
    TableContent,
    TableBody,
    Modal,
    TypeForm,
    InputIcon,
    Pagination,
  },
  data() {
    return {
      types: [],
      isVisible: false,
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      type: "",
      pages: [],
    };
  },
  methods: {
    showModal() {
      this.isVisible = true;
    },
    closeModal() {
      this.isVisible = false;
    },
    getTypes(page=1,type="") {
      product_type.getTypeProducts(page,type).then(({ data }) => {
        if (data.ok) {
          this.types = data.typesProducts;
          this.currentPage = data.curentPag;
          this.pages = paginate(data.curentPag, data.totalPag, 1);
          this.totalPag = data.totalPag;
          this.next = data.nextPag;
          this.prev = data.prevPag;
        }
      });
    },
    search(){
      this.getTypes(1,this.type)
    }
  },
  mounted() {
    this.getTypes();
  },
};
</script>

<style></style>
