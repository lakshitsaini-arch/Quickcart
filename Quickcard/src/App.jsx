import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {

  // ⭐ Cart State
  const [cart, setCart] = useState([]);

  // ⭐ Sidebar Open State
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  // ⭐ Total Items (Badge Count)
  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  return (
    <div className="app">

      {/* ⭐ Header */}
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      {/* ⭐ Product Section */}
      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={addToCart}
        />
      </main>

      {/* ⭐ Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

    </div>
  );
}

export default App;