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
            v-if="user.role === `Admin`"
            @click="deleteP(type)"
            :id="`btn-` + type.id"
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
      <TypeForm
        @close="closeModal"
        :old="type"
        @getTypes="reload"
        v-bind="type.id"
      />
    </Modal>
    <Modal
      v-show="deleteVisible"
      title="Eliminar tipo de producto"
      @close="closeModalDelete"
    >
      <p class="font-semibold text-xs font-mono">
        ¿Estas seguro de eliminar este registro?
      </p>
      <div class="flex mt-3 justify-center">
        <button
          @click="deleteMethod()"
          class="bg-blue-500 text-white text-xs px-4 py-2 rounded"
        >
          Aceptar
        </button>
        <button
          @click="closeModalDelete"
          class="bg-red-500 text-white text-xs ml-5 px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import TypeForm from "../ProductType/TypeForm.vue";
import type_product from "../../services/type-product";

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
      deleteVisible: false,
      user: this.$store.state.user,
    };
  },
  methods: {
    edit(type) {
      this.type = type;
      this.visible = true;
    },
    deleteP(type) {
      this.type = type;
      this.deleteVisible = true;
    },
    deleteMethod() {
      try {
        type_product
          .deleteType(this.type.id)
          .then(() => {
            this.$toast.info(`Se elimino el registro con exito`, {
              position: "bottom-right",
            });
            this.closeModalDelete();
            this.$emit("getTypes");
          })
          .catch(() => {
            this.$toast.error(
              `No puedes eliminar este registro porque ah sido usado`,
              {
                position: "bottom-right",
              }
            );
            this.closeModalDelete();
          });
      } catch (error) {
        this.$toast.error(`Se produjo un error inesperado`, {
          position: "bottom-right",
        });
      }
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    closeModalDelete() {
      this.deleteVisible = false;
    },
    reload() {
      this.$emit("getTypes");
    },
  },
};
</script>

<style></style>
