<template>
  <div class="w-screen h-screen flex justify-center all items-center">
    <Register @getUsers="getUsers" v-if="!user" />
    <img
      v-if="user"
      class="absolute w-56 top-3"
      src="../assets/pngaaa.com-4281162.png"
    />
    <Login :user="user" />
  </div>
</template>

<script>
import user from "../services/user";
import Register from "../components/Auth/Register.vue";
import Login from "../components/Auth/Login.vue";

export default {
  components: {
    Register,
    Login,
  },
  data() {
    return {
      user,
    };
  },
  methods: {
    getUsers() {
      user.getUser().then((res) => {
        if (res.data.message) {
          this.user = undefined;
          return;
        }
        if (res.data.ok) {
          this.user = res.data.users[0];
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
