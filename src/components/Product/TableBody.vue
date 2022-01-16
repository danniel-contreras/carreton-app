<template>
  <tbody>
    <tr v-for="product in products" v-bind:key="product.id">
      <TD :name="product.id" />
      <TD :name="product.name" />
      <TD :name="`$` + Number(product.price)" />
      <TD :name="product.typeProduct.type" />
      <TD>
        <div class="flex">
          <button
            @click="setEdit(product)"
            :id="`btn-` + product.id"
            class="text-white bg-green-500 px-3 py-1 text-sm rounded text-center"
          >
            <font-awesome-icon icon="pen-alt" />
          </button>
          <button
            class="text-white bg-red-500 px-3 text-sm py-1 rounded text-center ml-3"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </TD>
    </tr>
    <modal v-show="visible" title="Actualizar producto" @close="closeModal">
      <Form
        @getProducts="reload"
        @close="closeModal"
        :product="prod"
        v-bind="prod.id"
      />
    </modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import Form from "../Product/ProductForm.vue";

export default {
  props: {
    products: {
      type: Array,
    },
    getProducts: {
      type: Function,
    },
  },
  components: {
    TD,
    Modal,
    Form,
  },
  data() {
    return {
      visible: false,
      prod: {},
    };
  },
  methods: {
    setEdit(data) {
      let newProd = { ...data, typeProduct: data.typeProduct?.id };
      this.prod = newProd;
      this.visible = true;
      newProd = {};
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    reload() {
      this.$emit("getProducts");
    },
  },
  computed() {
    this.setEdit();
  },
};
</script>

<style></style>
