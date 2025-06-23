import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';

function Dashboard() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("sellerId");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [filters, setFilters] = useState({
    category: '',
    stockavailability: '',
  });

  const [newProduct, setNewProduct] = useState({
    productname: '',
    price: '',
    category: '',
    stockavailability: false,
    description: ''
  });

  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) navigate('/signin');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (sellerId) {
      fetch(`http://localhost:2402/product-api/products/${sellerId}`)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'products') {
            setProducts(data.payload);
            setFilteredProducts(data.payload); // initialize
          }
        })
        .catch(err => console.error("Error fetching products:", err));
    }
  }, [sellerId]);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setNewProduct({
      productname: product.productname,
      price: product.price,
      category: product.category,
      stockavailability: product.stockavailability,
      description: product.description
    });
    setShowModal(true);
  }

  async function handleDelete(_id) {
    try {
      const res = await fetch(`http://localhost:2402/product-api/product/${_id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.message.includes("success")) {
        setProducts(prev => prev.filter(p => p._id !== _id));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = editingProduct
      ? { ...newProduct, sellerId, _id: editingProduct._id }
      : { ...newProduct, sellerId };

    const url = editingProduct
      ? `http://localhost:2402/product-api/product/${editingProduct._id}`
      : 'http://localhost:2402/product-api/product';

    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.message.includes('success')) {
        setShowModal(false);
        setEditingProduct(null);
        setNewProduct({
          productname: '',
          price: '',
          category: '',
          stockavailability: false,
          description: ''
        });

        const refreshed = await fetch(`http://localhost:2402/product-api/products/${sellerId}`);
        const refreshedData = await refreshed.json();
        if (refreshedData.message === 'products') {
          setProducts(refreshedData.payload);
        }
      }
    } catch (err) {
      console.error("Error submitting product:", err);
    }
  }

  function applyFilters() {
    const result = products.filter(product => {
      const matchCategory = filters.category
        ? product.category.toLowerCase() === filters.category.toLowerCase()
        : true;
      const matchStock = filters.stockavailability !== ''
        ? product.stockavailability === (filters.stockavailability === 'true')
        : true;
      return matchCategory && matchStock;
    });
    setFilteredProducts(result);
  }

  return (
    <main className="bg-slate-900 min-h-screen text-slate-100 px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Your Products</h2>
        <div className="space-x-3">
          <button
            onClick={() => setShowFilterModal(true)}
            className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            🔍 Filter
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-slate-800 text-sm">
          <thead className="bg-slate-700">
            <tr>
              <th className="px-5 py-3 text-left font-semibold">Product Name</th>
              <th className="px-5 py-3 text-left font-semibold">Price (₹)</th>
              <th className="px-5 py-3 text-left font-semibold">Category</th>
              <th className="px-5 py-3 text-left font-semibold">Stock</th>
              <th className="px-5 py-3 text-left font-semibold">Description</th>
              <th className="px-5 py-3 text-left font-semibold">Update</th>
              <th className="px-5 py-3 text-left font-semibold">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center px-4 py-8 text-slate-400">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => (
                <tr key={index} className="border-b border-slate-700 hover:bg-slate-700 transition">
                  <td className="px-5 py-3">{product.productname}</td>
                  <td className="px-5 py-3">₹{product.price}</td>
                  <td className="px-5 py-3">{product.category}</td>
                  <td className="px-5 py-3">
                    {product.stockavailability ? "In Stock" : "Out of Stock"}
                  </td>
                  <td className="px-5 py-3">{product.description}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-400 hover:text-blue-600 transition"
                    >
                      <Pencil size={20} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-lg animate-fade-in">
            <h3 className="text-2xl font-semibold mb-4 text-slate-800">
              {editingProduct ? 'Update Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="productname" placeholder="Product Name" value={newProduct.productname} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md" required />
              <input name="price" type="number" placeholder="Price" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md" required />
              <input name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} className="w-full p-2 border border-slate-300 rounded-md" required />
              <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} rows="3" className="w-full p-2 border border-slate-300 rounded-md resize-none" required />
              <label className="flex items-center gap-2">
                <input name="stockavailability" type="checkbox" checked={newProduct.stockavailability} onChange={handleInputChange} />
                <span>In Stock</span>
              </label>
              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => { setShowModal(false); setEditingProduct(null); }} className="bg-slate-300 px-4 py-2 rounded hover:bg-slate-400">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">{editingProduct ? 'Update' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">Filter Products</h3>
            <div className="space-y-4">
              <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))} className="w-full border p-2 rounded">
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Grocery">Grocery</option>
                <option value="Fashion Accessories">Fashion Accessories</option>
                <option value="Wellness">Wellness</option>
                <option value="Gaming">Gaming</option>
              </select>
              <select value={filters.stockavailability} onChange={(e) => setFilters(prev => ({ ...prev, stockavailability: e.target.value }))} className="w-full border p-2 rounded">
                <option value="">All Stock</option>
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button onClick={() => { setFilters({ category: '', stockavailability: '' }); setShowFilterModal(false); }} className="bg-slate-300 px-4 py-2 rounded hover:bg-slate-400">Reset</button>
              <button onClick={() => setShowFilterModal(false)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Apply</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;