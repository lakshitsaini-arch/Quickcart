import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CartSidebar from './components/CartSidebar';

import { products } from './data/products';
import './styles/App.css';

function App() {

  // ⭐ Cart State
  const [cart, setCart] = useState([]);

  // ⭐ Sidebar Open State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ⭐ Search State
  const [searchTerm, setSearchTerm] = useState('');

  // ⭐ Add To Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ⭐ Remove Item
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  // ⭐ Update Quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ⭐ Toggle Sidebar
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // ⭐ Total Items Count
  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <BrowserRouter>
      <div className="app">

        <Header
          cartItemCount={getTotalItems()}
          onCartClick={toggleCart}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="main-content">
          <Routes>

            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  onAddToCart={addToCart}
                  searchTerm={searchTerm}
                />
              }
            />

            <Route
              path="/category/:category"
              element={
                <CategoryPage
                  products={products}
                  onAddToCart={addToCart}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                />
              }
            />

          </Routes>
        </main>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={toggleCart}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
        />

      </div>
    </BrowserRouter>
  );
}

export default App;