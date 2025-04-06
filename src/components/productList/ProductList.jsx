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
            {product.name} - {product.price} ₹
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
