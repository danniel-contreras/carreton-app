export function setItemCart(product, products) {
  if (products) {
    if (product) {
      const filtered = products.filter((a) => a.id === product.id);
      if (filtered.length === 1) {
        return sumItemCart(product, products);
      }
      const newItem = products.concat(product);
      return newItem;
    }
    return [];
  }
  return [product];
}

export function sumItemCart(product, products) {
  const cartsItems = products;
  const fnd = cartsItems.find((a) => a.id === product.id);
  const index = cartsItems.indexOf(fnd);
  cartsItems[index].quantity++;
  cartsItems[index].total_price =
    cartsItems[index].quantity * cartsItems[index].price;
  return cartsItems;
}

export function removeItem(item, products) {
  if (item) {
    if (products) {
      const fnd = products.find((a) => a.id === item.id);
      const index = products.indexOf(fnd);
      if (products[index].quantity <= 1) {
        products.splice(index, 1);
      } else if (products[index].quantity > 1) {
        products[index].price =
          products[index].price - products[index].price / products[index].quantity;
        products[index].quantity--;
      }
      return products;
    }
  }
}
