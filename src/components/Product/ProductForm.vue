<template>
  <div>
    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      :initial-values="product"
    >
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Nombre</label
        >
        <Field
          class="border font-mono text-xs rounded px-2 py-1 outline-none"
          placeholder="Escribe el nombre"
          name="name"
          type="text"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="name" />
      </div>
      <div class="flex flex-col mt-1">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Precio</label
        >
        <Field
          class="border font-mono text-xs rounded px-2 py-1 outline-none"
          placeholder="Escribe el precio"
          name="price"
          type="text"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="price" />
      </div>
      <div class="flex flex-col mt-1">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Tipo de producto</label
        >
        <Field
          :disabled="product"
          class="border font-mono text-xs rounded px-2 py-1 outline-none"
          name="typeProduct"
          as="select"
        >
          <option value="" selected>Selecciona el tipo</option>
          <option v-for="type in types" v-bind:key="type.id" :value="type.id">
            {{ type.type }}
          </option>
        </Field>
        <ErrorMessage
          class="text-xs font-mono text-red-500"
          name="typeProduct"
        />
      </div>
      <button class="purple text-white text-xs w-full rounded py-2 mt-2">
        {{ product ? "Actualizar" : "Agregar" }}
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import type_product from "../../services/type-product";
import product from "../../services/product";
import * as yup from "yup";

export default {
  props: {
    product: {
      type: Object,
    },
    getProducts: {
      type: Function,
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      name: yup.string().required("El nombre es requerido"),
      price: yup.string().required("El precio es requerido"),
      typeProduct: yup
        .number()
        .required("El tipo de producto es requerido")
        .typeError("El tipo de producto es requerido"),
    });
    return {
      schema,
      types: Array,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      if (this.product) {
        this.put(values, this.product.id, resetForm);
        return;
      }
      this.add(values, resetForm);
      return;
    },
    add(data, reset) {
      try {
        product.addProduct(data).then((res) => {
          if (res.data.ok) {
            reset();
            this.$toast.info(`Se agrego el producto con exito`, {
              position: "bottom-right",
            });
            this.$emit("close");
            this.$emit("getProducts");
          }
        });
      } catch (error) {
        this.$toast.error(`Se produjo un error inesperado`, {
          position: "bottom-right",
        });
      }
    },
    put(data, id, reset) {
      try {
        product.putProduct(data, id).then((res) => {
          if (res.data.ok) {
            reset();
            this.$toast.info(`Se actualizo el producto con exito`, {
              position: "bottom-right",
            });
            this.$emit("close");
            this.$emit("getProducts");
          }
        });
      } catch (error) {
        this.$toast.error(`Se produjo un error inesperado`, {
          position: "bottom-right",
        });
      }
    },
    getTypes() {
      type_product.showTypes().then((res) => {
        if (res.data.ok) {
          this.types = res.data.typesProducts;
        }
      });
    },
  },
  mounted() {
    this.getTypes();
  },
};
</script>
