<template>
  <div v-if="user" class="w-96 h-72 p-10 bg-white rounded-lg">
    <p class="text-center font-mono text-3xl">Bienvenido</p>
    <Form @submit="onSubmit" :validation-schema="schema">
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
          placeholder="Escribe tu password"
          name="password"
          type="password"
        />
        <ErrorMessage class="text-xs font-mono text-red-500" name="password" />
      </div>
      <button class="btn text-white text-xs w-full rounded py-2 mt-2">
        Iniciar sesion
      </button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import auth from "../../services/auth";
import { decodeToken, setToken } from "../../services/token";

export default {
  props: ["user"],
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
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values) {
      auth.newLogin(values).then((res) => {
        if (res.data.ok) {
          this.$toast.info(`Bienvenido!!!`, {
            position: "bottom-right",
          });
          const data = {
            state: true,
            data: decodeToken(res.data.token),
          };
          this.$router.go("/");
          this.$store.dispatch("setAuth", data);
          setToken(res.data.token);
          return;
        }
        this.$toast.error(`Datos invalidos!`, {
          position: "bottom-right",
        });
      });
    },
  },
};
</script>

<style></style>
