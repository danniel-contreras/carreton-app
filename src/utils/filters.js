import { HELADOS_TYPES, JALEAS_TYPES, TOPPING_TYPES } from "./constants";

export const filterSorbetes = (list) => {
  return list.filter((pr) => HELADOS_TYPES.includes(pr.typeProduct.type));
};

export const filterJaleas = (list) => {
  return list.filter((pr) => JALEAS_TYPES.includes(pr.typeProduct.type));
};

export const filterToppings = (list) => {
  return list.filter((pr) => TOPPING_TYPES.includes(pr.typeProduct.type));
};

export const reduceTotal = (order) => {
  return order.map((o) => Number(o.price)).reduce((a, b) => a + b, 0);
};
