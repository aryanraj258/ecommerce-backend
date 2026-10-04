import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();
  const token = localStorage.getItem('token');

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product handler
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        alert('Product deleted successfully!');
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete product.');
      }
    }
  };

  // Categories extraction
  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container my-4">
      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm position-relative">
                {product.category && (
                  <span className="badge bg-secondary position-absolute top-0 end-0 m-2">
                    {product.category}
                  </span>
                )}
                <img 
                  src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/150'} 
                  className="card-img-top" 
                  alt={product.title} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-muted">{product.description?.substring(0, 60)}...</p>
                  <h6 className="mt-auto text-primary font-weight-bold">Price: ₹{product.price}</h6>
                  
                  <div className="d-flex gap-2 mt-2">
                    <Link to={`/product/${product._id}`} className="btn btn-outline-primary flex-fill">
                      View
                    </Link>
                    <button 
                      className="btn btn-primary flex-fill"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </button>
                    {token && (
                      <button 
                        className="btn btn-outline-danger"
                        onClick={() => handleDelete(product._id)}
                        title="Delete Product"
                      >
                        🗑️️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center w-100 my-5">
            <h5>No products found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;