import { generateToken } from "../lib/token.js";
import { Menu } from "../models/menu.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const handleSignup = async (req,res)=>{

  const{name, email, password} = req.body;
  try{
    if(!name || !email || !password){
      return res.status(400).json({message:"all fields are required"});

    }

    if(password.length < 6){
      return res.status(400).json({message:"password should be atleast 6 characters"});
    }

    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message:"user already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(password,salt)

    const newUser = new User({
      name:name,
      email:email,
      password:hashedPassword
    })

    if(newUser){
      generateToken(newUser._id,res);
      await newUser.save();

      res.status(200).json({
        name:name,
        email:email,
      })
    }else{
      res.status(400).json({
        message:"invalid user data",
      })
    }


  }catch(error){
    console.log("Error in signup controller of admin",error.message);
    res.status(500).json({message:"internal server error"});
  }
}


export const handleLogin = async (req, res)=>{
  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user)return res.status(401).json({error: "Invalid Credentials"});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({error:"Invalid Credentials"});


    const token  = generateToken(user._id, res);

    res.status(200).json({
      message: "Login Successful", 
      token,
    });

  }catch(error){
    console.log("Error in handle login", error);
    res.status(500).json({error: "Login failed"});
  }
}



export const showItems = async(req,res)=>{
  try{
    const menuItems = await Menu.find({}).select('_id itemName price description preparationTime');
    res.status(200).json({
      // success:true,
      menuItems
      // message:"success fetching data",

    })
  }catch(error){
    console.log("error in showItems controller", error);
  }
}



export const addItem =  async(req,res)=>{

    try{

        const{itemName, price, description,category, preparationTime } = req.body;
    
        if (!itemName || !price || !category) {
          return res.status(400).json({
            success: false,
            message: 'Item name, price, and category are required fields.'
          });
        }
    
        const newItem = await Menu.create({
          itemName: itemName.trim(),
          price: parseFloat(price),
          description: description.trim(),
          category: category,
          preparationTime: preparationTime ? parseInt(preparationTime) : null,
          createdAt: new Date().toISOString(),
        })


        return res.status(201).json({
            success:true, 
            message:"menu item added successfully",
            data:newItem
        });
    }catch(error){
        console.error('Error adding new item', error.message);
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message,
        });
    };
}

export const updateItem = async (req,res)=>{
  
  const {name, price, description, prepTime} = req.body;
  const itemId = req.params.id;
  try{  
  const updatedItem = await Menu.findByIdAndUpdate(itemId,{
    itemName:name,
    price:price,
    description:description,
    preparationTime:prepTime,

  },{new:true});

  res.status(200).json({updatedItem});
  }catch(error){
    res.status(500).json({message:"error in updateItem controller in adminController", error})
  }


}

export const deleteItem = async (req,res)=>{
  const itemId = req.params.id;
  try{
    const isDeleted = await Menu.findByIdAndDelete(itemId);
    if(isDeleted)res.status(200).json({message:"Item deleted successfully"});
    else console.log("error in delete Item controller");
  }catch(error){
    res.status(500).json({message:"error in deleteItem controller in admin controller",error});
  }

}



