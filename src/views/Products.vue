<template>
  <Layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de productos</p>
    <button @click="showModal" class="bg-blue-500 mt-4 text-white px-8 text-sm py-1 rounded">
      Agregar
    </button>
    <modal v-show="visible" title="Agregar nuevo producto" @close="closeModal">
        <Form/>
    </modal>
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import Form from "../components/Product/Form.vue"
import Modal from "../components/Global/Modal.vue";

export default {
  name: "Products",
  components: {
    Layout,
    Modal,
    Form
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
};
</script>

<style></style>
