import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  getUser() {
    return axios.get(API_PATH + "/user");
  },
};
