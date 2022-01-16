import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  getTypeProducts() {
    return axios.get(API_PATH + "/type-product");
  },
};
