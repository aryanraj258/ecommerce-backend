import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading product details...</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center my-5">
        <h4>Product Not Found</h4>
        <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 text-center">
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400'}
            alt={product.title}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <span className="badge bg-secondary mb-2">{product.category || 'General'}</span>
          <h2 className="mb-3">{product.title}</h2>
          <h3 className="text-primary fw-bold mb-3">₹{product.price}</h3>
          <p className="text-muted mb-4 fs-5">{product.description}</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              addToCart(product);
              alert('Added to Cart!');
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;