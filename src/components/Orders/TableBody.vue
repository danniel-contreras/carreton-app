<template>
  <tbody>
    <tr v-for="order in orders" v-bind:key="order.id">
      <TD :name="order.id" />
      <TD :name="order.orderCode" />
      <TD :name="`$`+ order.total_price" />
      <TD :name="order.date" />
    </tr>
  </tbody>
</template>

<script>
import TD from "../Global/TD.vue";
import { formatRelative, subDays } from "date-fns";
import { es } from "date-fns/locale";

export default {
  props: {
    orders: {
      type: Array,
    },
  },
  components: {
    TD,
  },
  methods: {
    formatDate(date) {
      return formatRelative(subDays(new Date(date), 0), new Date(), {
        locale: es,
      });
    },
  },
};
</script>

<style></style>
