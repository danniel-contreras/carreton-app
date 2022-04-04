import axios from "axios";
import { API_PATH } from "../utils/constants";
import { getToken } from "./token";

export default {
  newOrder(data) {
    return axios.post(API_PATH + "/order/new-order", data, {
      headers: {
        token: "bearer:" + getToken(),
      },
    });
  },
  getOrders(page = 1,status=0,code="") {
    return axios.get(API_PATH + `/order/orders-paginated?page=${page}&status=${status}&code=${code}`, {
      headers: {
        token: "bearer:" + getToken(),
      },
    });
  },
  orders() {
    return axios.get(API_PATH + `/order`, {
      headers: {
        token: "bearer:" + getToken(),
      },
    });
  },
  getOrderDetails(id){
  return axios.get(API_PATH + `/order-detail/od-detailsByOrder/${id}`, {
      headers: {
        token: "bearer:" + getToken(),
      },
    });
  }
};
