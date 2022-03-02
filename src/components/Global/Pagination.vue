<template>
  <ul class="flex mt-6">
    <li>
      <button
        @click="changePage(prev)"
        class="mx-1 purple cursor-pointer rounded-full p-3 w-10 text-center text-xs text-white"
        :disabled="currentPage === 1"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>
    </li>
    <li
      class="mx-1 border border-gray-500 rounded-full p-3 w-10 text-center text-xs cursor-pointer"
      v-for="page in pages"
      :class="
        page === currentPage ? `purple text-white` : `bg-white purple-text`
      "
      v-bind:key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </li>
    <li>
      <button
        class="mx-1 purple rounded-full p-3 w-10 cursor-pointer text-center text-xs text-white"
        :disabled="currentPage === totalPag"
        @click="changePage(next)"
      >
        <font-awesome-icon icon="chevron-right" />
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    method: {
      type: Function,
    },
    pages: {
      type: Array,
    },
    currentPage: {
      type: Number,
    },
    totalPag: {
      type: Number,
    },
    next: {
      type: Number,
    },
    prev: {
      type: Number,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("method", page);
    },
  },
};
</script>

<style>
.purple {
  background: linear-gradient(180deg, #130121 0%, #000000 100%);
}
.purple-text {
  color:linear-gradient(180deg, #130121 0%, #000000 100%) ;
}
</style>
