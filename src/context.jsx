import { createContext, useContext, useEffect, useState } from "react";
import { calculateChange, getData } from "./utils";

const StateContext = createContext();

// const validDenominations = [1, 2, 5, 10, 20, 50, 100];
const validDenominations = [100, 50, 20, 10, 5, 2, 1];

const StateProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [changeGiven, setChangeGiven] = useState([]);

  useEffect(() => {
    getData(setProducts, setMessage);
  }, []);

  // @Select Product
  const chooseProduct = (product) => {
    setSelectedProduct(product);
    setInsertedAmount(0);
    setMessage("");
    setChangeGiven([]);
  };

  const showError = (msg) => {
    setMessage({ type: "error", text: msg });
    setChangeGiven([]);
  };

  const showSuccess = (msg) => {
    setMessage({ type: "success", text: msg });
  };

  const handleSuccessfulPurchase = (total) => {
    const change = total - selectedProduct.price;
    const changeArray = calculateChange(change, validDenominations);

    showSuccess(
      `✅ You bought ${selectedProduct.name}. ${
        change > 0 ? `Change returned: ₹${changeArray.join(",")}` : ""
      }`
    );

    setChangeGiven(changeArray);
    setInsertedAmount(0);
    setSelectedProduct(null);
  };

  // @Insert Money
  const insertMoney = (amount) => {
    if (!selectedProduct) {
      return showError("⚠️ Please select a product before inserting money.");
    }

    if (!validDenominations.includes(amount)) {
      return showError("❌ Invalid denomination inserted.");
    }

    let newTotal = insertedAmount + amount;
    setInsertedAmount(newTotal);

    if (selectedProduct && newTotal >= selectedProduct.price) {
      handleSuccessfulPurchase(newTotal);
    } else {
      const remaining = selectedProduct.price - newTotal;
      showError(
        `💸 Not enough money. Please insert ₹${remaining} more to buy ${selectedProduct.name}.`
      );
    }
  };

  return (
    <StateContext.Provider
      value={{
        products,
        setProducts,
        insertMoney,
        message,
        changeGiven,
        chooseProduct,
        selectedProduct,
        insertedAmount,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);

export default StateProvider;
