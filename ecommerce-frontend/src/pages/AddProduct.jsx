import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productPayload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        images: [formData.image],
        category: formData.category
      };

      await axios.post('http://localhost:5000/api/products', productPayload);
      alert('🎉 Product Added Successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding product:', err);
      setMessage(err.response?.data?.message || 'Failed to add product');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card p-4 shadow-sm">
        <h3 className="text-center mb-4">Add New Product</h3>
        {message && <div className="alert alert-danger">{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product details"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 1499"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electronics, Grocery"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              required
              value={formData.image}
              onChange={handleChange}
              placeholder="https://via.placeholder.com/150"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;