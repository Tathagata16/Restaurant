import { Menu } from "../models/menu.model.js";
import Order from "../models/orders.model.js";

import twilio from "twilio";
import dotenv from "dotenv"

dotenv.config();
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)



async function displayHome(req,res){

    try{
        const items = await Menu.find({}).sort({createdAt:-1}).select('itemName price description category image preparationTime').lean()

        // const data = {"message":"hello form controller","status":true};

        res.status(200).json({
            items
        })

    }catch(error){
        console.error('Error fetching home page items:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching menu items'
        });
    }
    
  
}


async function handlePlaceOrder(req,res) {
    const {userName, phone, address, cartItems} = req.body;
    if (!userName || !phone || !address) {
          return res.status(400).json({
            success: false,
            message: 'userName, phone, address are required fields.'
          });
        }

    
    
    const price = cartItems.reduce((total, item) => {
        return total + (item.quantity * item.price);
    }, 0);



    try{
       const newOrder =  await Order.create({
        userName:userName.trim(),
        phone:phone.trim(),
        address:address.trim(),
        cartItems: cartItems ,
        price:price ,
        createdAt: new Date().toISOString(),
       })

       //Sending messages to customer

    //    const messageBody = `Hello ${userName}!👋
    //    Thanks for ordering from Your Restaurant 🍽️

    //     🧾 Order Details:
    //     ${cartItems.map((item) => `${item.itemName} × ${item.quantity}`).join(", ")}
    //     💰 Total Bill: ₹${totalBill}
    //     🏠 Address: ${address}

    //     We’ll contact you soon. Thank you!`


    //     await client.messages.create({
    //         from:process.env.TWILIO_PHONE_NUMBER,
    //         to:`+91${phone.trim()}`,
    //         body:messageBody,
    //     })

       res.status(200).json({
        success:true,
        message:"order creation successfull and sms sent to customer",
       })


    }catch(error){
        console.log("Error in handlePlaceOrder Controller");
        res.status(500).json({
            success:false,
            message:"error in order creation"
        })
    }

}

export  {displayHome, handlePlaceOrder};