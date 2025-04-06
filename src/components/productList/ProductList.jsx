import React from "react";
import { useGlobalState } from "../../context";

import "./productList.css";

const ProductList = () => {
  const { products, chooseProduct, selectedProduct } = useGlobalState();

  return (
    <div className="products">
      <h3>Products</h3>
      <div className="products-list">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => chooseProduct(product)}
            className={
              selectedProduct && selectedProduct.id === product.id
                ? "selected"
                : ""
            }
          >
            <div>
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>₹ {product.price}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
