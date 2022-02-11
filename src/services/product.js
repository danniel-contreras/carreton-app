import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  getProducts() {
    return axios.get(API_PATH + "/product-cart");
  },
  getPaginates(page,name){
    return axios.get(API_PATH + `/product-cart/product-paginated?take=5&page=${page}&name=${name}`)
  },
  addProduct(data) {
    return axios.post(API_PATH + "/product-cart", data);
  },
  putProduct(data, id) {
    return axios.put(API_PATH + "/product-cart/" + id, data);
  },
};
