<template>
  <Layout>
    <p class="font-mono font-semibold text-xl mb-5">
      Lista de productos disponibles
    </p>
    <div class="flex">
      <div class="flex mb-5">
        <label class="text-gray-500 text-xs pt-1 font-semibold font-mono mr-2"
          >Buscar</label
        >
        <div class="relative flex text-gray-600 focus-within:text-gray-400">
          <input-icon />
          <input
            placeholder="Escribe para buscar..."
            @keyup="search"
            v-model="name"
            class="w-96 py-1 text-xs pl-10 rounded border outline-none"
          />
        </div>
      </div>
      <div v-closable="close" class="absolute right-24 top-16 flex flex-col">
        <button
          class="text-white font-bold text-3 p-3 rounded-full shadow hover:shadow-lg bg-green-500 ease-linear transition-all duration-150 outline-none focus:outline-none mr-1 mb-1 capitalize w-full"
          type="button"
          v-on:click="toggleDropdown()"
          ref="btnDropdownRef"
        >
          <span
            class="bg-red-500 text-white absolute -top-2 rounded p-1 font-small right-1"
            >{{ count }}</span
          >
          <font-awesome-icon icon="shopping-cart" />
        </button>
        <CartProducts
          @removeCart="removeCart"
          @clearCart="clearCart"
          :cart="cart"
          :dropdownPopoverShow="dropdownPopoverShow"
        />
      </div>
    </div>

    <Catalog @addCart="addCart"  :products="products" />
    <pagination
      v-if="totalPag > 1"
      @method="getProducts"
      :currentPage="currentPage"
      :pages="pages"
    />
  </Layout>
</template>

<script>
import Layout from "../layout/Layout.vue";
import product from "../services/product";
import Catalog from "../components/Product/Catalog.vue";
import CartProducts from "../components/Global/CartProducts.vue";
import Pagination from "../components/Global/Pagination.vue";
import { createPopper } from "@popperjs/core";
import { setItemCart, removeItem } from "../utils/cart";
import { paginate } from "../utils/utils";

export default {
  components: {
    Layout,
    Catalog,
    CartProducts,
    Pagination,
  },
  data() {
    return {
      currentPage: 0,
      next: 0,
      prev: 0,
      totalPag: 0,
      products: [],
      dropdownPopoverShow: false,
      count: 0,
      cart: undefined,
      pages: [],
      name: "",
    };
  },
  methods: {
    getProducts(page = 1, name = "") {
      product.getPaginates(page, name).then(({ data }) => {
        if (data.ok) {
          this.products = data.products;
          this.currentPage = data.curentPag;
          this.pages = paginate(data.curentPag, data.totalPag, 1);
          this.totalPag = data.totalPag;
          this.next = data.nextPag;
          this.prev = data.prevPag;
        }
      });
    },
    toggleDropdown() {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
    addCart(prod) {
      const nw = setItemCart(prod, this.cart);
      this.cart = nw;
      this.count = this.cart.length;
    },
    removeCart(prod) {
      const remo = removeItem(prod, this.cart);
      this.cart = remo;
      this.count = this.cart.length;
    },
    clearCart(){
      this.cart = []
      this.count = 0
    },
    close() {
      this.dropdownPopoverShow = false;
    },
    search() {
      this.getProducts(1, this.name);
    },
  },
  mounted() {
    this.getProducts();
  },
  directives: {
    closable: {
      beforeMount(el, binding) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>

<style></style>
