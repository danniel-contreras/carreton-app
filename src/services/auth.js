import axios from "axios";
import { API_PATH } from "../utils/constants";

export const newUser = async (data) => {
  const response = await axios.post(API_PATH + "/user", data);
  return response;
};

export default {
  newLogin(data) {
    return axios.post(API_PATH + "/auth/login", data);
  },
  newRegister(data) {
    return axios.post(API_PATH + "/user", data);
  },
};
