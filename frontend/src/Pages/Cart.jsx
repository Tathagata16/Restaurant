import React from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 to-red-100 flex flex-col items-center py-16 px-4">
      
      <h2 className="text-4xl font-bold text-red-700 mb-8 border-b-4 border-red-500 pb-2">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg mt-10">Your cart is currently empty 🍽️</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-red-100 flex justify-between items-center hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
            >
              <div>
                <h4 className="text-2xl font-semibold text-gray-800 capitalize">
                  {item.itemName}
                </h4>
                <p className="text-gray-600 mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="text-xl font-semibold text-red-600">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="w-full max-w-3xl mt-10 bg-white p-6 rounded-2xl shadow-md text-center border border-red-200">
          <h3 className="text-3xl font-semibold text-gray-800 mb-4">
            Total: <span className="text-red-600">₹{total}</span>
          </h3>

          <Link to="/order">
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Go To Order →
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart;
