import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orderrs, setOrderrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const userName = user?.name || user?.email || 'Guest User';
    axios.get(`http://localhost:5000/api/orderrs/${userName}`)
      .then(res => {
        setOrderrs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orderrs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container text-center my-5">
        <h4>Loading your orderrs...</h4>
      </div>
    );
  }

  if (orderrs.length === 0) {
    return (
      <div className="container text-center my-5">
        <h4>No Orderrs Placed Yet 📦</h4>
        <p className="text-muted">You haven't placed any orderrs so far.</p>
        <Link to="/" className="btn btn-primary mt-2">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h3 className="mb-4">My Orderrs History</h3>
      {orderrs.map((orderr) => (
        <div key={orderr._id} className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between bg-light align-items-center">
            <div>
              <strong>Orderr ID:</strong> <span className="text-muted">{orderr._id}</span>
            </div>
            <div>
              <strong>Date:</strong> {new Date(orderr.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div className="card-body">
            <ul className="list-group mb-3">
              {orderr.orderItems.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-0">{item.title}</h6>
                    <small className="text-muted">Quantity: {item.quantity || 1}</small>
                  </div>
                  <span className="fw-bold">₹{item.price * (item.quantity || 1)}</span>
                </li>
              ))}
            </ul>
            <div className="text-end">
              <h5>Total Paid: <span className="text-primary fw-bold">₹{orderr.totalPrice}</span></h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;