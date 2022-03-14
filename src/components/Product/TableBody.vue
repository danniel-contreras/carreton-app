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
          v-show="user.role ===  `Admin` "
           @click="deleteP(product)"
            :id="`btn-` + product.id"
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
    <modal v-show="visibleDelete" title="Eliminar producto" @close="closeModalDelete">
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
    </modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import Form from "../Product/ProductForm.vue";
import product from "../../services/product"

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
      visibleDelete:false,
      user: this.$store.state.user,
    };
  },
  methods: {
    setEdit(data) {
      let newProd = { ...data, typeProduct: data.typeProduct?.id };
      this.prod = newProd;
      this.visible = true;
      newProd = {};
    },
     deleteP(data) {
      this.prod = data;
      this.visibleDelete = true 
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
     closeModalDelete() {
      this.visibleDelete = false;
    },
    reload() {
      this.$emit("getProducts");
    },
    deleteMethod(){
       try {
        product.delete(this.prod.id)
          .then(() => {
            this.$toast.info(`Se elimino el registro con exito`, {
              position: "bottom-right",
            });
            this.closeModalDelete();
            this.$emit("getProducts");
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
    }
  },
  computed() {
    this.setEdit();
  },
};
</script>

<style></style>
