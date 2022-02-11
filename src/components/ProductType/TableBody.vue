<template>
  <tbody>
    <tr v-for="type in types" v-bind:key="type.id">
      <TD :name="type.id" />
      <TD :name="type.type" />
      <TD>
        <div class="flex">
          <button
            @click="edit(type)"
            :id="`btn-` + type.id"
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
    <Modal
      v-show="visible"
      title="Actualizar tipo de producto"
      @close="closeModal"
    >
      <TypeForm @close="closeModal" :old="type" @getTypes="reload" v-bind="type.id" />
    </Modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import TypeForm from "../ProductType/TypeForm.vue";

export default {
  components: {
    Modal,
    TD,
    TypeForm,
  },
  props: {
    types: {
      type: Array,
    },
    getTypes: { type: Function },
  },
  data() {
    return {
      type: {},
      visible: false,
    };
  },
  methods: {
    edit(type) {
      this.type = type;
      this.visible = true;
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    reload() {
      this.$emit("getTypes");
    },
  },
};
</script>

<style></style>
