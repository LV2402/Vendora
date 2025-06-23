import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Signin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    sellername: "",
    password: ""
  })

  const navigate = useNavigate()

  function handleChange(e){
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:2402/seller-api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sellername: formData.sellername,
          password: formData.password
        })
      })
      const data = await res.json()
      if (res.ok && data.message === "login successful") {
        login(data.token, data.sellerId);
        alert("Login successful!")
        navigate('/profile')
        console.log("Login successful:", data.sellerId);
      } else {
        alert(data.message || "Login failed")
      }
    } catch (err) {
      console.error("Error during login:", err)
      alert("Login failed. Please try again.")
    }
  }

  return (
    <main className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Seller Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Seller Name
            </label>
            <input
              type="text"
              name="sellername"
              value={formData.sellername}
              onChange={handleChange}
              placeholder="Enter your seller name"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}

export default Signin