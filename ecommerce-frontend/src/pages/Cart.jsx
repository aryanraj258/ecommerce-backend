import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
      alert('Please Login first to place an orderr!');
      navigate('/login');
      return;
    }

    try {
      const orderrData = {
        user: user?.name || user?.email || 'Guest User',
        orderItems: cart,
        totalPrice: totalAmount
      };

      await axios.post('http://localhost:5000/api/orderrs', orderrData);
      alert('🎉 Orderr Placed Successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      console.error('Orderr Error:', err);
      alert('Failed to place orderr. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container text-center my-5">
        <h4>Your Cart is Empty 🛒</h4>
        <p className="text-muted">Start adding products from the home page!</p>
        <Link to="/" className="btn btn-primary mt-2">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h3 className="mb-4">Shopping Cart</h3>
      <div className="row">
        <div className="col-md-8">
          <div className="list-group">
            {cart.map((item) => (
              <div key={item._id} className="list-group-item d-flex align-items-center justify-content-between p-3 mb-2 shadow-sm rounded">
                <div className="d-flex align-items-center">
                  <img
                    src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/80'}
                    alt={item.title}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                    className="me-3"
                  />
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0 text-muted">₹{item.price}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item._id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-3 fw-bold">{item.quantity || 1}</span>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => updateQuantity(item._id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="text-end">
                  <h6 className="mb-1">₹{item.price * (item.quantity || 1)}</h6>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4 className="card-title">Order Summary</h4>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Total Items:</span>
              <span>{cart.reduce((acc, item) => acc + (item.quantity || 1), 0)}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3">
              <span>Total Price:</span>
              <span className="text-primary">₹{totalAmount}</span>
            </div>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={handleCheckout}
            >
              Checkout / Place Orderr
            </button>
            <button
              className="btn btn-outline-danger w-100"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;