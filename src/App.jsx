import VenderControl from "./components/vendorControl/VenderControl";

import "./App.css";
import ProductList from "./components/productList/ProductList";

function App() {
  return (
    <div className="app">
      <ProductList />
      <VenderControl />
    </div>
  );
}

export default App;
