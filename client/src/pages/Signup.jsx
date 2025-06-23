import { useState } from "react"
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    sellername: "",
    email: "",
    password: "",
    confirmPassword: ""
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    try{
      const res=await fetch("http://localhost:2402/seller-api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sellername:formData.sellername,
          email:formData.email,
          password:formData.password,
        })
      })
      if(res.ok){
        alert("Account created successfully!")
        navigate('/signin')
      }else{
        const data = await res.json()
        alert("Signup failed: " + data.message)
      }
    }catch(err){
      console.error("Error creating account:", err)
      alert("Failed to create account. Please try again.")
    }
  }

  return (
    <main className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create Seller Account
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
              placeholder="Enter your seller name"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={handleChange}
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
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </main>
  )
}

export default Signup