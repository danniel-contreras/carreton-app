<template>
  <div class="w-screen h-screen flex justify-center all items-center">
    <Register v-if="!user" />
    <img
      v-if="user"
      class="absolute w-56 top-3"
      src="../assets/pngaaa.com-4281162.png"
    />
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
            placeholder="Escribe tu email"
            name="password"
            type="password"
          />
          <ErrorMessage
            class="text-xs font-mono text-red-500"
            name="password"
          />
        </div>
        <button class="btn text-white text-xs w-full rounded py-2 mt-2">
          Iniciar sesion
        </button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import auth from "../services/auth";
import user from "../services/user";
import { decodeToken, setToken } from "../services/token";
import Register from "../components/Auth/Register.vue";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    Register,
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
      user,
    };
  },
  methods: {
    onSubmit(values) {
      auth.newLogin(values).then((res) => {
        if (res.data.ok) {
          const data = {
            state: true,
            data: decodeToken(res.data.token),
          };
          this.$router.go("/");
          this.$store.dispatch("setAuth", data);
          setToken(res.data.token);
        }
      });
    },
    getUsers() {
      user.getUser().then((res) => {
        if (res.data.message) {
          this.user = undefined;
          return;
        }
      });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style>
.all {
  background: linear-gradient(180deg, #6b18ac 0%, #3f0045 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.text-sm {
  font-size: 11px !important;
}
.btn {
  background: #3f0045;
}
</style>
