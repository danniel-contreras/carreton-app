import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  getProductTypes() {
    return axios.get(API_PATH + "/type-product");
  },
};
