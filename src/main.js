import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.css"; // tailwind basic styles
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faIceCream,
  faUserAlt,
  faTimes,
  faSignOutAlt,
  faTrashAlt,
  faPenAlt,
  faChevronDown,
  faChevronUp,
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import Toaster from "@meforma/vue-toaster";

library.add(
  faIceCream,
  faUserAlt,
  faTimes,
  faSignOutAlt,
  faTrashAlt,
  faPenAlt,
  faChevronDown,
  faChevronUp,
  faShoppingCart,
  faChevronLeft,
  faChevronRight,
  faUserCircle
);

createApp(App)
  .use(router)
  .use(store)
  .use(Toaster)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
