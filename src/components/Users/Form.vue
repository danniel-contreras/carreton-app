<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user">
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
      <div v-show="!user" class="flex flex-col mt-3">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Password</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe la contraseña"
          name="password"
          type="password"
          autocomplete="nope"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="password" />
      </div>
      <div v-show="!user" class="flex flex-col mt-3">
        <label  class="text-xs text-gray-500 font-mono font-semibold"
          >Repite la password</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Confirma la password"
          name="repassword"
          type="password"
          autocomplete="nope"
        />
        <ErrorMessage
          class="text-xs font-mono text-red-500"
          name="repassword"
        />
      </div>
      <button
        type="submit"
        class="btn text-white text-xs w-full rounded py-2 mt-2"
      >
        Guardar
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import auth from "../../services/auth";

export default {
  props:{
    close:{
      type:Function
    },
    getUsers:{
      type:Function
    },
    user:{
      type:Object
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object({
      email: yup
        .string()
        .required("El email es requerido")
        .email("Email invalido"),
      password: yup.string().required("Debes escribir tu password"),
      repassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Las contraseñas deben ser iguales")
        .required("Debes confirmar tu contraseña"),
      name: yup.string().required("El nombre es requerido"),
      lastname: yup.string().required("El apellido es requerido"),
    });
    return {
      schema,
    };
  },
  methods: {
     onSubmit(values) {
      auth.newRegister(values).then((res) => {
        if (res.data.ok) {
          this.$toast.info(`Se guardo el usuario`, {
            position: "bottom-right",
          });
          this.$emit("getUsers");
          this.$emit("close")
          return;
        }
        this.$toast.error(`Error en los datos`, {
          position: "bottom-right",
        });
        //this.$router.go();
      });
    },
  },
};
</script>

<style></style>
