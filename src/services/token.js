import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
  return jwtDecode(token);
};

export const setToken = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const deleteToken = () => {
  localStorage.removeItem("token");
};

export const isExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeOut = expire - Date.now();
  if (timeOut < 0) {
    return true;
  }
  return false;
};
export const isUserLoggedApi = () => {
  const token = getToken();
  if (!token) {
    deleteToken();
    return false;
  }
  if (isExpiredToken(token)) {
    deleteToken();
    return false;
  }
  return true;
};
