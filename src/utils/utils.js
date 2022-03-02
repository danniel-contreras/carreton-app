// define method
export const paginate = (current_page, last_page, onSides = 3) => {
  // pages
  let pages = [];
  // Loop through
  for (let i = 1; i <= last_page; i++) {
    // Define offset
    let offset = i == 1 || last_page ? onSides + 1 : onSides;
    // If added
    if (
      i == 1 ||
      (current_page - offset <= i && current_page + offset >= i) ||
      i == current_page ||
      i == last_page
    ) {
      pages.push(i);
    } else if (
      i == current_page - (offset + 1) ||
      i == current_page + (offset + 1)
    ) {
      pages.push("...");
    }
  }
  return pages;
};

export const filterDates = (orders, month) => {
  const filter = orders.filter(
    (order) => new Date(order.date).getMonth() + 1 === month
  );
  return filter.length;
};

export const dataFilter = (dates) => {
  return [
    { mes: "Enero", ventas: filterDates(dates,1) },
    { mes: "Febrero", ventas: filterDates(dates,2) },
    { mes: "Marzo", ventas: filterDates(dates,3) },
    { mes: "Abril", ventas: filterDates(dates,4) },
    { mes: "Mayo", ventas: filterDates(dates,5) },
    { mes: "Junio", ventas: filterDates(dates,6) },
    { mes: "Julio", ventas: filterDates(dates,7) },
    { mes: "Agosto", ventas: filterDates(dates,8) },
    { mes: "Septiembre", ventas: filterDates(dates,9) },
    { mes: "Octubre", ventas: filterDates(dates,10) },
    { mes: "Noviembre", ventas: filterDates(dates,11) },
    { mes: "Diciembre", ventas: filterDates(dates,12) },
  ];
};
