export const getData = (setProducts, setMessage) => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => setProducts(data))
    .catch((err) => {
      console.error("Fetch failed:", err);
      setMessage({ type: "error", text: "Failed to load products." });
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
