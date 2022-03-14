<template>
  <div>
    <Form @submit="onSubmit" :initial-values="old" :validation-schema="schema">
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Nombre</label
        >
        <Field
          class="border font-mono text-xs rounded px-2 py-1 outline-none"
          placeholder="Escribe el nombre"
          name="type"
          type="text"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="type" />
      </div>
      <button
        type="submit"
        class="purple text-white rounded w-full text-xs py-1 font-mono mt-3"
      >
        {{ old ? "Actualizar" : "Agregar" }}
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import types from "../../services/type-product";

export default {
  props: {
    close: {
      type: Function,
    },
    getTypes: {
      type: Function,
    },
    old: { type: Object },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      type: yup.string().required("El nombre es requerido"),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values, { resetForm }) {
      if (this.old) {
        this.put(values, resetForm);
        return;
      }
      this.add(values, resetForm);
      return;
    },
    add(values, reset) {
      try {
        types.createNewType(values).then((res) => {
          if (res.data.ok) {
            reset();
            this.$toast.info(`Se agrego el tipo con exito`, {
              position: "bottom-right",
            });
            this.$emit("close");
            this.$emit("getTypes");
          }
        });
      } catch (error) {
        this.$toast.error(`Se produjo un error inesperado`, {
          position: "bottom-right",
        });
      }
    },
    put(values, reset) {
      try {
        types.editType(values, this.old.id).then((res) => {
          if (res.data.ok) {
            reset();
            this.$toast.info(`Se actualizo el tipo con exito`, {
              position: "bottom-right",
            });
            this.$emit("close");
            this.$emit("getTypes");
          }
        });
      } catch (error) {
        this.$toast.error(`Se produjo un error inesperado`, {
          position: "bottom-right",
        });
      }
    },
  },
};
</script>

<style></style>
