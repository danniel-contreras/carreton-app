<template>
  <th
    class="px-5 font-mono text-xs py-3 border-b-2 text-left whitespace-nowrap border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider"
  >
    {{name}}
  </th>
</template>

<script>
export default {
  props: ["name"],
};
</script>
