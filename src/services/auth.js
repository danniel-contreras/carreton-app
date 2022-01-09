import axios from "axios";
import { API_PATH } from "../utils/constants";

export default {
  newLogin(data) {
    return axios.post(API_PATH + "/auth/login", data);
  },
  register(data) {
    return axios.post(API_PATH + "/user", data);
  },
};
