import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const CartContext = createContext();

// 2. Create Provider
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Sibling Component 1: Navbar
const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <div style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}>
      🛒 Cart Items: <strong>{cart.length}</strong>
    </div>
  );
};

// 4. Sibling Component 2: ProductList
const ProductList = () => {
  const { addToCart } = useContext(CartContext);

  const products = ["Apple 🍎", "Banana 🍌", "Orange 🍊"];

  return (
    <div>
      <h3>Products</h3>
      {products.map((p, index) => (
        <button
          key={index}
          onClick={() => addToCart(p)}
          style={{ display: "block", margin: "5px", padding: "8px" }}
        >
          Add {p} to Cart
        </button>
      ))}
    </div>
  );
};

// 5. Sibling Component 3: CartDetails
const CartDetails = () => {
  const { cart, clearCart } = useContext(CartContext);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Cart Details</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button onClick={clearCart} style={{ marginTop: "10px", padding: "8px" }}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

// 6. Main App
const Appp = () => {
  return (
    <CartProvider>
      <Navbar />
      <ProductList />
      <CartDetails />
    </CartProvider>
  );
};

export default Appp;
