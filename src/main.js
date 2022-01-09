import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from '@vuelidate/core';
import "./main.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIceCream,
  faUserAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faIceCream, faUserAlt, faTimes);

createApp(App)
  .use(router)
  .use(store)
  .use(Vuelidate)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
