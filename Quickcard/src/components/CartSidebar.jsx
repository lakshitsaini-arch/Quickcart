import React from 'react';
import '../styles/CartSidebar.css';

function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {

  // ✅ Calculate Total Price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>

      {/* ⭐ Header */}
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button onClick={onClose} className="close-btn">✕</button>
      </div>

      {/* ⭐ Cart Items */}
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() =>
                    onUpdateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    onUpdateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => onRemoveItem(item.id)}
              >
                🗑️
              </button>

            </div>
          ))
        )}
      </div>

      {/* ⭐ Footer */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      )}

    </div>
  );
}

export default CartSidebar;