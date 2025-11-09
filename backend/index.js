import express from "express"
import publicRouter from "./src/routes/publicRoutes.js"
import adminRouter from "./src/routes/adminRoutes.js"
import cors from "cors"
import mongodb from "mongodb"
import mongoose from "mongoose"
const PORT = process.env.PORT || 3000;
const app = express();



app.use(cors({
    origin:"http://localhost:5175",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://Tatha:Tatha123@menu.vnwvyxa.mongodb.net/?appName=Menu")

        console.log(`mongodb connected: ${conn.connection.host}`);

    }catch(error){
        console.log("error connecting to database", error);
    }
}

connectDb();

app.use("/tomato", publicRouter);
app.use("/tomato/admin",adminRouter)

app.listen(PORT, ()=>{
    console.log("server running on port");
})