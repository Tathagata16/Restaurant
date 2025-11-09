import express from "express"
const router = express.Router();
import {displayHome, handlePlaceOrder} from "../controllers/publicController.js";


router.get("/",displayHome);
router.post("/order", handlePlaceOrder);




export default router;