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
        </div>
      </TD>
    </tr>
    <modal @close="closeModal" title="Actualizar usuario" v-show="visible">
      <Edit @close="closeModal" @getUsers="reload" :user="user"/>
    </modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue";
import Edit from "../Users/Edit.vue"

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
    Edit
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
      let newu =  {
        id:user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email
      }
      this.user = newu
      this.showModal()
      newu = {}
    },
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    reload(){
      this.$emit("getUsers")
    }
  },
  computed() {
    this.setEdit();
  },
};
</script>

<style></style>
