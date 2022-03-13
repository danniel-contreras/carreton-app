<template>
  <layout>
    <p class="text-2xl font-thin font-mono text-gray-700">Lista de usuarios</p>
    <div class="flex w-full mt-3">
      <div class="flex flex-col">
        <label class="text-gray-700 text-xs pt-1 font-semibold font-mono mr-2"
          >Buscar por nombre del usuario</label
        >
        <div class="relative flex text-gray-700 focus-within:text-gray-400">
          <input-icon />
          <input
            @keyup="search"
            placeholder="Escribe para buscar..."
            v-model="name"
            class="w-96 py-1 text-xs pl-10 rounded border outline-none"
          />
        </div>
      </div>

      <button
        @click="showModal"
        class="purple mr-auto h-7 mt-4 ml-40 text-white px-8 text-sm py-1 rounded"
      >
        Agregar
      </button>
    </div>
    <Table>
      <TableContent/>
      <TableBody  @getUsers="getUsers" :users="users" />
    </Table>
    <modal v-show="visible" title="Agregar nuevo usuario" @close="closeModal">
      <Form @close="closeModal" @getUsers="getUsers"/>
    </modal>
  </layout>
</template>

<script>
import Layout from "@/layout/Layout.vue";
import user from "../services/user";
import InputIcon from "../components/Global/InputIcon.vue"
import Table from "../components/Global/Table.vue"
import TableContent from "../components/Users/TableContent.vue"
import TableBody from "../components/Users/TableBody.vue"
import Modal from "../components/Global/Modal.vue"
import Form from "../components/Users/Form.vue"
import { paginate } from "../utils/utils";

export default {
  name: "Users",
  components: {
    Layout,
    InputIcon,
    Table,
    TableContent,
    TableBody,
    Modal,
    Form
  },
  data() {
    return {
      visible:false,
      users: [],
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      pages: [],
    };
  },
  methods: {
    getUsers() {
      user.getUsersPaginate().then(({ data }) => {
        if (data.ok) {
          this.users = data.users;
          this.currentPage = data.curentPag;
          this.pages = paginate(data.curentPag, data.totalPag, 1);
          this.totalPag = data.totalPag;
          this.next = data.nextPag;
          this.prev = data.prevPag;
        }
      });
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
