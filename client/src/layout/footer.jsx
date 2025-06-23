import React from 'react'

function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 shadow-sm text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">SPM Portal</h4>
          <p className="text-sm text-slate-400">
            Seller Products Management Portal helps sellers manage their listings,
            inventory, and performance metrics with ease and efficiency.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
          <p className="text-sm text-slate-400">Email: support@spmportal.com</p>
          <p className="text-sm text-slate-400">Phone: +91 99858 85147</p>
          <p className="text-sm text-slate-400">Address: Hyderabad, India</p>
        </div>
      </div>

      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} SPM Portal. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
