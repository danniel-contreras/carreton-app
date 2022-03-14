<template>
  <div>
    <Form
      @submit="onSubmit"
      :validation-schema="schematwo"
      :initial-values="user"
    >
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Nombre</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe el nombre"
          name="name"
          type="name"
          autocomplete="off"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="name" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Apellido</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe el apellido"
          name="lastname"
          type="lastname"
          autocomplete="off"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="lastname" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Email</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe el email"
          name="email"
          type="email"
          autocomplete="nope"
          aria-autocomplete="none"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="email" />
      </div>
      <button
        type="submit"
        class="btn text-white text-xs w-full rounded py-2 mt-2"
      >
       Actualizar
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import user from "../../services/user";

export default {
  props: {
    close: {
      type: Function,
    },
    getUsers: {
      type: Function,
    },
    user: {
      type: Object,
    },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schematwo = yup.object({
      email: yup
        .string()
        .required("El email es requerido")
        .email("Email invalido"),
      name: yup.string().required("El nombre es requerido"),
      lastname: yup.string().required("El apellido es requerido"),
    });
    return {
      schematwo,
    };
  },
  methods: {
    onSubmit(values) {
      try {
        user.addUser(values,this.user.id).then(({ data }) => {
          if (data.ok) {
            this.$toast.info(`Se guardo el usuario`, {
              position: "bottom-right",
            });
            this.$emit("getUsers");
            this.$emit("close");
            return;
          }
          this.$toast.error(`Error en los datos`, {
            position: "bottom-right",
          });
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
