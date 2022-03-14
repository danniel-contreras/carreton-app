import axios from "axios";
import { API_PATH } from "../utils/constants";
import { getToken } from "./token";

export default {
  getUser() {
    return axios.get(API_PATH + "/user");
  },
  getUsersPaginate() {
    return axios.get(API_PATH + "/user/users-paginated", {
      headers: { token: "bearer" + getToken() },
    });
  },
  addUser(data,id) {
    return axios.put(API_PATH + "/user/" + id, data,{
      headers: { token: "bearer" + getToken() },
    }
    );
  },
};
