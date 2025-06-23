import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  function handleClick(type) {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      if (type === 'signin') {
        navigate('/signin');
      } else if (type === 'signup') {
        navigate('/signup');
      }
    }
  }

  return (
    <main className="bg-slate-900 min-h-screen text-slate-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl animate-fade-in-up space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-blue-400 tracking-tight">
          Welcome to Vendora
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-medium italic">
          Your Business. Your Products. Your Control.
        </p>

        <p className="text-slate-400 text-base md:text-lg leading-relaxed pt-2">
          Manage your products effortlessly with our all-in-one Seller Product Management Portal.  
          Add, update, and track your inventory — all from one powerful dashboard.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
            onClick={() => handleClick('signin')}
          >
            Get Started
          </button>
          <button
            className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            onClick={() => handleClick('signup')}
          >
            Register
          </button>
        </div>

        <div className="mt-10 text-left text-slate-400 text-sm leading-loose px-2 md:px-0">
          <h2 className="text-slate-200 text-base font-semibold mb-2">Key Features:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>🔐 Secure Seller Authentication</li>
            <li>🛍️ Full Product Lifecycle Control</li>
            <li>📊 Intuitive Product Dashboard</li>
            <li>🔎 Real-Time Search & Category Filtering</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Home;
