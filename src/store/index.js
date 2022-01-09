import { createStore } from "vuex";
import { isUserLoggedApi, getToken, decodeToken } from "../services/token";

const token = getToken();
const data = {
  isauth: isUserLoggedApi(),
  user: isUserLoggedApi() ? decodeToken(token) : undefined,
};

const store = createStore({
  state() {
    return data;
  },
  actions: {
    setAuth({ commit }, auth) {
      commit("SET_AUTH", auth);
    },
  },
  mutations: {
    SET_AUTH: (state, auth) => {
      state.isauth = auth.state;
      state.user = auth.data;
    },
  },
});

export default store;
