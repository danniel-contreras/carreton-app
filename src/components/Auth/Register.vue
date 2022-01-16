<template>
  <div class="w-96 h-auto p-10 bg-white rounded-lg">
    <p class="text-center font-mono text-xl">Crea una nueva cuenta</p>
    <Form @submit="onSubmit" :validation-schema="schema">
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Nombre</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe tu nombre"
          name="name"
          type="name"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="name" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Apellido</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe tu apellido"
          name="lastname"
          type="lastname"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="lastname" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Email</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe tu email"
          name="email"
          type="email"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="email" />
      </div>
      <div class="flex flex-col mt-3">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Password</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Escribe tu email"
          name="password"
          type="password"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="password" />
      </div>
      <div class="flex flex-col mt-3">
        <label class="text-xs text-gray-500 font-mono font-semibold"
          >Repite tu password</label
        >
        <Field
          class="border text-xs rounded px-2 py-1"
          placeholder="Confirma tu password"
          name="repassword"
          type="repassword"
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
  name: "Register",
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
          this.$toast.info(`Info Toast Message`, {
            position: "bottom-right",
          });
          this.$emit("getUsers");
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
