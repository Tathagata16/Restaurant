import mongoose from "mongoose";

const ordersSchemma = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String, 
        required:true,
    },
    cartItems: [{
        _id: String,
        itemName: String,
        price: Number,
        quantity: Number,
        
    }],
    price:{
        type:Number, 
        required:true,
    },

},{timestamps:true});

const Order = mongoose.model("Order", ordersSchemma);
export default Order;