import axios from "axios";
import { API_PATH } from "../utils/constants";
import { getToken } from "./token";

export default {
  getTypeProducts(page, type) {
    return axios.get(
      API_PATH +
        `/type-product/type-products-paginated?page=${page}&type=${type}`
    );
  },
  createNewType(data) {
    return axios.post(API_PATH + "/type-product", data, {
      headers: { token: "bearer:" + getToken() },
    });
  },
  editType(data, id) {
    return axios.put(API_PATH + "/type-product/" + id, data, {
      headers: { token: "bearer:" + getToken() },
    });
  },
  showTypes() {
    return axios.get(API_PATH + "/type-product");
  },
  deleteType(id) {
    return axios.delete(API_PATH + "/type-product/" + id, {
      headers: { token: "bearer:" + getToken() },
    });
  },
};
