import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';   // ⭐ Context import
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {

  const navigate = useNavigate();

  // ⭐ Get values from Context
  const { getTotalItems, toggleCart } = useCart();

  // Categories
  const categories = ['Electronics', 'Accessories', 'Home', 'Sports'];

  return (
    <header className="header">
      <div className="header-container">

        {/* Top row */}
        <div className="header-top">
          <Link to="/" className="header-logo">
            <h1 className="header-title">🛒 QuickCart</h1>
          </Link>

          {/* ⭐ Cart Button */}
          <button className="cart-icon-btn" onClick={toggleCart}>
            🛒
            {getTotalItems() > 0 && (
              <span className="cart-badge">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>

          {categories.map(cat => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="nav-link"
            >
              {cat}
            </Link>
          ))}

          <Link to="/cart" className="nav-link">Cart</Link>
        </nav>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);
              navigate("/");
            }}
            className="search-input"
          />
        </div>

      </div>
    </header>
  );
}

export default Header;