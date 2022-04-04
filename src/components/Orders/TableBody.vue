<template>
  <tbody>
    <tr v-for="order in orders" v-bind:key="order.id">
      <TD :name="order.id" />
      <TD :name="order.orderCode" />
      <TD :name="`$`+ order.total_price" />
      <TD :name="formatdate(order.date)" />
      <TD>
        <button @click="showDetails(order.id)" class="purple text-white rounded text-xs py-2 px-4">Ver</button>
      </TD>
    </tr>
    <modal v-show="visible" title="Detalles de la orden" @close="closeModal">
     <div v-for="detail in details" v-bind:key="detail.id">
       <span> - {{detail.productCart.name}} - ${{Number(detail.total_unit)}}</span>
     </div>
    </modal>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import Modal from "../Global/Modal.vue"
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";
import orders from "../../services/orders"

export default {
  props: {
    orders: {
      type: Array,
    },
  },
  components: {
    TD,
    Modal
  },
  data(){
    return{
      visible:false,
      details:[]
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
    showDetails(id){
      this.showModal()
      this.getDetails(id)
    },
    getDetails(id){
      orders.getOrderDetails(id).then(({data})=>{
        if(data.ok){this.details = data.order_details}
      })
    },
    formatdate: (date) => {
      return formatRelative(subDays(new Date(date), 0), new Date(), {
        locale: es,
      });
    },
  },
};
</script>

<style></style>
