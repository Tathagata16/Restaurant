import React, { useState } from 'react'
import axiosInstance from '../lib/axios.js'
import { useNavigate } from 'react-router-dom'
import { useCart } from "../context/CartContext.jsx"

const OrderPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const [formData, setFormData] = useState({
    userName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Fill your details below to place your order 🍽️");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems || cartItems.length === 0) {
      setMessage("Your cart is empty. Please add items before placing an order.");
      return;
    }

    setLoading(true);
    try {
      const requestedData = {
        ...formData,
        cartItems: cartItems
      };

      const response = await axiosInstance.post("/order", requestedData);

      if (response.data.success) {
        setMessage("✅ Order placed successfully! Redirecting to home...");
        setFormData({
          userName: "",
          phone: "",
          address: "",
        });
        setCartItems([]);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage(response.data.message || "Failed to place order.");
      }

    } catch (error) {
      console.error('Error placing order', error);
      setMessage(error.response?.data?.message || 'Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-red-100 flex flex-col items-center py-16 px-4">
      {/* Header Message */}
      {message && (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-md border border-red-200 text-center mb-8 max-w-xl">
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      )}

      {/* Order Summary */}
      {cartItems.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md border border-red-100 mb-10">
          <h3 className="text-2xl font-bold text-red-700 mb-4">🛒 Order Summary</h3>
          <div className="space-y-3">
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between text-gray-700 border-b border-red-100 pb-2">
                <span className="capitalize">{item.itemName} × {item.quantity}</span>
                <span className="font-semibold text-red-600">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xl font-semibold text-gray-800 text-right">
            Total: <span className="text-red-600">₹{total}</span>
          </div>
        </div>
      )}

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border border-red-100 space-y-5"
      >
        <h2 className="text-3xl font-bold text-red-700 text-center mb-4">
          Delivery Details
        </h2>

        <div>
          <label htmlFor="userName" className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">WhatsApp Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your WhatsApp number"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium mb-1">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            placeholder="Enter your complete address"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className={`px-8 py-3 text-lg font-semibold rounded-full shadow-md transition-all duration-200 ${
              loading || cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default OrderPage
