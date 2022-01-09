<template>
  <div>
    <div class="flex flex-col">
      <label class="font-mono text-xs font-semibold text-gray-500"
        >Nombre</label
      >
      <input
        class="border text-xs px-2 rounded py-1"
        placeholder="Escribe el nombre del producto"
      />
    </div>
    <div class="flex flex-col mt-3">
      <label class="font-mono text-xs font-semibold text-gray-500"
        >Precio</label
      >
      <input
        class="border text-xs px-2 rounded py-1"
        placeholder="Escribe el nombre del producto"
      />
    </div>
     <div class="flex flex-col mt-3">
      <label class="font-mono text-xs font-semibold text-gray-500"
        >Tipo de producto</label
      >
      <select
        class="border text-xs px-2 rounded py-1"
      >
        <option value="DEFAULT" selected disabled>Selecciona el tipo</option>
      </select>
    </div>
    <button class="bg-blue-500 text-white w-full rounded text-xs font-mono py-1 mt-5">Guardar</button>
  </div>
</template>

<script>
export default {
  name: "Form",
};
</script>

<style></style>
