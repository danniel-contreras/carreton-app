import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  getProducts() {
    return axios.get(API_PATH + "/product-cart");
  },
  addProduct(data) {
    return axios.post(API_PATH + "/product-cart", data);
  },
  putProduct(data, id) {
    return axios.put(API_PATH + "/product-cart/" + id, data);
  },
};
