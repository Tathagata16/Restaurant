import { createContext, useState,useContext } from "react";

const CartContext = createContext();



export const CartProvider = ({children})=>{
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item)=>{
        setCartItems((prev)=>{
            const existing = prev.find((i)=>i._id===item._id);

            if(existing){
                return prev.map((i)=>
                    i._id === item._id ? {...i, quantity:i.quantity + 1}:i
                )
            }

            return [...prev, {...item, quantity: 1}];
        });
    };


    const removeFromCart = (id) => {
        setCartItems((prev)=>{
            const updatedItems = prev.map((i)=>
                i._id === id ? {...i , quantity: i.quantity - 1} : i
            );
            return updatedItems.filter((i)=>i.quantity > 0);
        })

        
    }

    return (
        <CartContext.Provider value = {{cartItems, addToCart, removeFromCart, setCartItems}}>
            {children}
        </CartContext.Provider>
    );



};

export const useCart = ()=> useContext(CartContext);