import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isLoggedIn, logout } = useAuth();

  function handleLogout(){
    console.log("Logging out");
    logout();
    window.location.href = '/'
  };

  return (
    <header className="bg-slate-800 shadow-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-100">MyApp</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-slate-300 hover:text-white transition font-medium">
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li><Link to="/dashboard" className="text-slate-300 hover:text-white">Dashboard</Link></li>
                <li><Link to="/profile" className="text-slate-300 hover:text-white">Profile</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-slate-300 hover:text-white transition font-medium cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/signup" className="text-slate-300 hover:text-white">Signup</Link></li>
                <li><Link to="/signin" className="text-slate-300 hover:text-white">Signin</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
