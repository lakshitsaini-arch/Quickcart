import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CartPage.css';

function CartPage({ cart, onUpdateQuantity, onRemoveItem }) {

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>
          <Link to="/">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-page-content">

          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">

                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
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

                <div className="cart-item-total">
                  ₹{item.price * item.quantity}
                </div>

                <button
                  className="remove-btn"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Total: ₹{calculateTotal()}</h2>

            <div className="cart-actions">
              <Link to="/" className="continue-btn">
                Continue Shopping
              </Link>

              <button className="checkout-btn">
                Checkout
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;