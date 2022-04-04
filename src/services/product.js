import axios from "axios";
import { API_PATH } from "../utils/constants";
import { getToken } from "./token";

export default {
  getProducts() {
    return axios.get(API_PATH + "/product-cart");
  },
  getPaginates(page, name,take=5) {
    return axios.get(
      API_PATH +
        `/product-cart/product-paginated?take=${take}&page=${page}&name=${name}`
    );
  },
  addProduct(data) {
    return axios.post(API_PATH + "/product-cart", data, {
      headers: { token: "bearer:" + getToken() },
    });
  },
  putProduct(data, id) {
    return axios.put(API_PATH + "/product-cart/" + id, data);
  },
  delete(id) {
    return axios.delete(API_PATH + "/product-cart/" + id, {
      headers: { token: "bearer:" + getToken() },
    });
  },
};
