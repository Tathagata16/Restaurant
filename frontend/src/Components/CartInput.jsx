import React, { useState } from 'react';
import {useCart} from "../context/CartContext.jsx"

const CartInput = ({item}) => {
//   const [quantity, setQuantity] = useState(1);

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   const increaseQuantity = () => {
//     setQuantity(quantity + 1);
//   };

    const {addToCart, removeFromCart, cartItems } = useCart();
    const currentItem = cartItems.find((i)=>i._id === item._id);

    const quantity = currentItem ? currentItem.quantity : 0;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid #ddd',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: 'white'
    }}>
      {/* Minus Button */}
      <button
        onClick={()=>removeFromCart(item._id)}
        disabled={quantity === 0}
        style={{
          border: 'none',
          backgroundColor: quantity === 0 ? '#f5f5f5' : '#ff6b35',
          color: quantity === 0 ? '#ccc' : 'white',
          padding: '8px 12px',
          cursor: quantity === 0 ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (quantity > 1) {
            e.target.style.backgroundColor = '#e55a2b';
          }
        }}
        onMouseLeave={(e) => {
          if (quantity > 1) {
            e.target.style.backgroundColor = '#ff6b35';
          }
        }}
      >
        −
      </button>

      {/* Quantity Display */}
      <div style={{
        padding: '8px 16px',
        minWidth: '50px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: '500',
        borderLeft: '1px solid #eee',
        borderRight: '1px solid #eee',
        backgroundColor: '#f9f9f9'
      }}>
        {quantity}
      </div>

      {/* Plus Button */}
      <button
        onClick={()=>addToCart(item)}
        style={{
          border: 'none',
          backgroundColor: '#ff6b35',
          color: 'white',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#e55a2b';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#ff6b35';
        }}
      >
        +
      </button>
    </div>
  );
};

export default CartInput;