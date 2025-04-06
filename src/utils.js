export const getData = (setProducts) => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => {
      throw new Error("Failed to load products.", err);
    });
};

export const calculateChange = (amount, validDenominations) => {
  const result = [];
  let remaining = amount;

  for (let coin of validDenominations) {
    while (remaining >= coin) {
      remaining -= coin;
      result.push(coin);
    }
  }
  return result;
};
