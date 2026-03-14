import React from 'react';
import { useParams } from 'react-router-dom';
import ProductList from './ProductList';

function CategoryPage({ products, onAddToCart }) {
  // Get category from URL params
  const { category } = useParams();

  // Filter products by category
  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">
      {/* Category title */}
      <h2>{category} Products</h2>

      {/* Handle empty state */}
      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <ProductList 
          products={filteredProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

export default CategoryPage;