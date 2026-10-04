import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand font-weight-bold" to="/">Hidden Store</Link>
      <div className="navbar-nav ms-auto align-items-center">
        <Link className="nav-link text-white me-3" to="/">Home</Link>
        <Link className="nav-link text-white me-3" to="/cart">
          Cart ({cart.length})
        </Link>

        {token ? (
          <>
            <Link className="nav-link text-white me-3" to="/orders">My Orderrs</Link>
            <Link className="nav-link text-white me-3" to="/add-product">Add Product</Link>
            <button className="btn btn-outline-light btn-sm ms-2" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link text-white me-3" to="/login">Login</Link>
            <Link className="nav-link text-white" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;