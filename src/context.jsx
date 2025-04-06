import { createContext, useContext, useEffect, useState } from "react";
import { calculateChange, getData } from "./utils";

// Create global context
const StateContext = createContext();

// Valid money denominations (descending order for easier change calculation)
const validDenominations = [100, 50, 20, 10, 5, 2, 1];

const StateProvider = ({ children }) => {
  // State variables
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [changeGiven, setChangeGiven] = useState([]);

  // ──────────────── Helper Functions ────────────────

  const showError = (text) => {
    setMessage({ type: "error", text });
    setChangeGiven([]);
  };

  const showSuccess = (text) => {
    setMessage({ type: "success", text });
  };

  // ──────────────── Core Logic ────────────────

  // Select product and reset state
  const chooseProduct = (product) => {
    setSelectedProduct(product);
    setInsertedAmount(0);
    setMessage("");
    setChangeGiven([]);
  };

  // Insert money handler
  const insertMoney = (amount) => {
    if (!selectedProduct) {
      return showError("⚠️ Please select a product before inserting money.");
    }

    if (!validDenominations.includes(amount)) {
      return showError("❌ Invalid denomination inserted.");
    }

    const newTotal = insertedAmount + amount;
    setInsertedAmount(newTotal);

    if (newTotal >= selectedProduct.price) {
      handleSuccessfulPurchase(newTotal);
    } else {
      const remaining = selectedProduct.price - newTotal;
      showError(
        `Not enough money. Please insert ₹${remaining} more to buy ${selectedProduct.name}.`
      );
    }
  };

  // Handle successful purchase
  const handleSuccessfulPurchase = (totalAmount) => {
    const change = totalAmount - selectedProduct.price;
    const changeArray = calculateChange(change, validDenominations);

    showSuccess(
      `✅ You bought ${selectedProduct.name}. ${
        change > 0 ? `Change returned: ₹${changeArray.join(", ")}` : ""
      }`
    );

    setChangeGiven(changeArray);
    setInsertedAmount(0);
    setSelectedProduct(null);
  };

  // Refund / cancel purchase
  const refund = () => {
    if (insertedAmount === 0) {
      return setMessage({ type: "info", text: "ℹ️ No money to refund." });
    }

    const refundChange = calculateChange(insertedAmount, validDenominations);

    setMessage({
      type: "info",
      text: `Purchase canceled. Refunded ₹${refundChange.join(", ")}.`,
    });

    setChangeGiven(refundChange);
    setInsertedAmount(0);
    setSelectedProduct(null);
  };

  // ──────────────── Load Product Data ────────────────

  useEffect(() => {
    getData(setProducts, setMessage);
  }, []);

  // ──────────────── Global Context Provider ────────────────

  return (
    <StateContext.Provider
      value={{
        products,
        selectedProduct,
        insertedAmount,
        message,
        changeGiven,
        chooseProduct,
        insertMoney,
        refund,
        setProducts,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access global state
export const useGlobalState = () => useContext(StateContext);

export default StateProvider;
