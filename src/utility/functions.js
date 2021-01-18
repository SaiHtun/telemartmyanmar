const stringCutter = (str, number) => {
  if (str.length > number) {
    return str.substr(0, number - 6) + "...";
  }
  return str;
};

const currencyFormatter = (number) => {
  return new Intl.NumberFormat().format(number);
};

export { stringCutter, currencyFormatter };
