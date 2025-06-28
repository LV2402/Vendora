import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const { isLoggedIn, sellerId, logout } = useAuth();
  const navigate = useNavigate();
  const [productStats, setProductStats] = useState({
    total: 0,
    inStock: 0,
    outOfStock: 0
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin');
    } else {
      fetch(`https://vendora-6sar.onrender.com/product-api/products/${sellerId}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'products') {
            const products = data.payload;
            const total = products.length;
            const inStock = products.filter(p => p.stockavailability).length;
            const outOfStock = total - inStock;
            setProductStats({ total, inStock, outOfStock });
          }
        })
        .catch(err => console.error("Error loading profile data:", err));
    }
  }, [isLoggedIn, sellerId, navigate]);

  function handleLogout(){
    console.log("Logging out");
    logout();
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-blue-400">Your Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-slate-600 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Total Products</h2>
            <p className="text-2xl font-bold text-blue-200">{productStats.total}</p>
          </div>
          <div className="bg-green-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">In Stock</h2>
            <p className="text-2xl font-bold">{productStats.inStock}</p>
          </div>
          <div className="bg-red-700 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Out of Stock</h2>
            <p className="text-2xl font-bold">{productStats.outOfStock}</p>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Manage Products
          </Link>
          <button
            onClick={handleLogout}
            className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;