<template>
  <tbody>
    <tr v-for="user in users" v-bind:key="user.id">
      <TD :name="user.id" />
      <TD :name="user.name" />
      <TD :name="user.role.role" />
      <TD :name="user.email" />
      <TD>
        <div class="flex">
          <button
            @click="setEdit(user)"
            :id="`btn-` + user.id"
            class="text-white bg-green-500 px-3 py-1 text-sm rounded text-center"
          >
            <font-awesome-icon icon="pen-alt" />
          </button>
          <button
            :id="`btn-` + user.id"
            class="text-white bg-red-500 px-3 text-sm py-1 rounded text-center ml-3"
          >
            <font-awesome-icon icon="trash-alt" />
          </button>
        </div>
      </TD>
    </tr>
    <modal @close="closeModal" title="Actualizar usuario" v-show="visible">
      <Form @close="closeModal" @getUsers="getusers" :user="user"/>
    </modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import Form from "../Users/Form.vue"

export default {
  props: {
    users: {
      type: Array,
    },
    getUsers:{
      type:Function
    }
  },
  components: {
    TD,
    Modal,
    Form
  },
  data() {
    return {
      visible: false,
      prod: {},
      visibleDelete: false,
      user:{}
    };
  },
  methods: {
    setEdit(user) {
      this.user = user
      console.log(user)
      this.showModal()
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
  computed() {
    this.setEdit();
  },
};
</script>

<style></style>
