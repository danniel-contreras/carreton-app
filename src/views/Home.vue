<template>
  <layout>
    <p class="text-gray-500 font-semibold">Ventas por cada mes</p>
    <Chart
      :size="{ width: 800, height: 500 }"
      :data="all"
      :margin="margin"
      :direction="direction"
      :axis="axis"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Area
          :dataKeys="['mes', 'ventas']"
          type="monotone"
          :areaStyle="{ fill: 'url(#grad)' }"
        />
        <Line
          :dataKeys="['mes', 'ventas']"
          type="monotone"
          :lineStyle="{
            stroke: '#9f7aea',
          }"
        />
        <Marker
          v-if="marker"
          :value="1000"
          label="Mean."
          color="green"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <defs>
          <linearGradient id="grad" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#be90ff" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0.4" />
          </linearGradient>
        </defs>
      </template>

      <template #widgets>
        <Tooltip
          borderColor="#48CAE4"
          :config="{
            ventas: { color: '#3F0960' },
            mes: { color: '#3F0960' },
          }"
        />
      </template>
    </Chart>
  </layout>
</template>

<script>
import { Chart, Grid, Line,Marker ,Area,Tooltip} from "vue3-charts";
import Layout from "../layout/Layout.vue";
import orders from "../services/orders";
import { dataFilter } from "../utils/utils";

export default {
  name: "LineChart",
  components: { Chart, Grid, Line, Layout, Area,Tooltip,Marker },
  data() {
    const direction = "horizontal";
    const margin = {
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    };
    const axis = {
      primary: {
        type: "band",
      },
      secondary: {
        domain: ["dataMin", "dataMax + 100"],
        type: "linear",
        ticks: 8,
      },
    };
    return { all: [], direction, margin, axis };
  },
  methods: {
    getOrders() {
      orders.orders().then(({ data }) => {
        if (!data.ok) {
          this.all = dataFilter(data.orders);
          console.log(this.all);
          return;
        }
      });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style>
.tick {
  color: darkblue;
}
.chart > svg {
  width: 800px !important;
}
</style>
