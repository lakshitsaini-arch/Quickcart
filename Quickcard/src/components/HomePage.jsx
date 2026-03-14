import React from 'react';
import ProductList from './ProductList';
import { useCart } from '../context/CartContext';   // ⭐ Context

function HomePage({ products, searchTerm }) {

  // ⭐ Get function from Context
  const { addToCart } = useCart();

  // ⭐ Filter products
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* ⭐ Search Result Count */}
      {searchTerm && (
        <p>
          Showing {filtered.length} result
          {filtered.length !== 1 && "s"} for "{searchTerm}"
        </p>
      )}

      {/* ⭐ Product List */}
      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ProductList
          products={filtered}
          onAddToCart={addToCart}
        />
      )}

    </div>
  );
}

export default HomePage;