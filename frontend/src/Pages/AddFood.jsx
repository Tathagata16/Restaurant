import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../lib/axios.js'

const AddFood = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    description: "",
    category: "",
    preparationTime: "",
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axiosInstance.post("/admin/menu/add", formData);
      setMessage("✅ Food item added successfully!");
      setFormData({
        itemName: '',
        price: '',
        description: '',
        category: '',
        preparationTime: '',
      });
    } catch (error) {
      console.error('Error adding food item:', error);
      setMessage(error.response?.data?.message || '❌ Error adding food item. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-orange-100 flex flex-col items-center py-16 px-6">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-red-700 mb-8 tracking-wide">
        🍅 Add New Menu Item
      </h1>

      {/* Message */}
      {message && (
        <div className={`mb-6 text-center px-6 py-3 rounded-xl shadow-md font-medium ${message.includes('✅')
          ? 'bg-green-100 text-green-700 border border-green-300'
          : 'bg-red-100 text-red-700 border border-red-300'}`}>
          {message}
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-red-100 space-y-6"
      >
        {/* Item Name */}
        <div>
          <label htmlFor="itemName" className="block text-gray-700 font-semibold mb-1">
            Item Name
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter item name"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter price"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none resize-none"
            placeholder="Write a short description..."
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none bg-white"
          >
            <option value="">Select category</option>
            <option value="gravy">Gravy</option>
            <option value="rice">Rice</option>
            <option value="dessert">Dessert</option>
            <option value="fast-food">Fast Food</option>
            <option value="starter">Starter</option>
            <option value="biriyani">Biriyani</option>
          </select>
        </div>

        {/* Preparation Time */}
        <div>
          <label htmlFor="preparationTime" className="block text-gray-700 font-semibold mb-1">
            Preparation Time (mins)
          </label>
          <input
            type="number"
            name="preparationTime"
            placeholder="e.g. 15"
            value={formData.preparationTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 text-lg font-semibold rounded-full shadow-md transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg'
            }`}
          >
            {loading ? "Adding Item..." : "Add Food Item"}
          </button>
        </div>
      </form>

      {/* Link to Menu List */}
      <Link to={"/admin/menu/list"} className="mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-200">
          🍽 View Current Items
        </button>
      </Link>
    </div>
  )
}

export default AddFood
