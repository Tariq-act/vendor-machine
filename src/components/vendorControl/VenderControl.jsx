import React from "react";
import { useGlobalState } from "../../context";

import "./vendorControl.css";

const VenderControl = () => {
  const { selectedProduct, insertMoney, message, insertedAmount } =
    useGlobalState();
  const denominations = [1, 2, 5, 10, 20, 50, 100];

  return (
    <div className="container">
      <div className="vendor">
        {message.type === "success" && (
          <h3 className="success">{message.text}</h3>
        )}

        <h2>Choose Item</h2>
        {selectedProduct ? (
          <div>
            <p>
              <b>Name: </b>
              {selectedProduct.name}
            </p>
            <p>
              <b>Price: </b>
              {selectedProduct.price} ₹
            </p>
          </div>
        ) : (
          <h4>Empty</h4>
        )}

        {message.type === "error" && <p className="error">{message.text}</p>}
        {insertedAmount > 0 && <p>Inserted Amount: {insertedAmount}</p>}

        <div className="amounts">
          {denominations.map((amount) => (
            <button key={amount} onClick={() => insertMoney(amount)}>
              {amount}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VenderControl;
