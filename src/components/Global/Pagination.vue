<template>
  <ul class="flex mt-6">
    <li>
      <button
        @click="changePage(prev)"
        class="mx-1 bg-blue-500 cursor-pointer rounded-full p-3 w-10 text-center text-xs text-white"
        :disabled="currentPage === 1"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>
    </li>
    <li
      class="mx-1 border border-blue-500 rounded-full p-3 w-10 text-center text-xs cursor-pointer"
      v-for="page in pages"
      :class="
        page === currentPage
          ? `bg-blue-500 text-white`
          : `bg-whiter text-blue-500`
      "
      v-bind:key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </li>
    <li>
      <button
        class="mx-1 bg-blue-500 rounded-full p-3 w-10 cursor-pointer text-center text-xs text-white"
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

<style></style>
