import express from "express"
import { addItem, handleLogin, showItems } from "../controllers/adminControllers.js";
import { handleSignup, updateItem,deleteItem } from "../controllers/adminControllers.js";
import { verifyAdminToken } from "../middlewares/authMiddleware.js";
const router = express.Router();





router.post('/signup',handleSignup);
router.post('/login',handleLogin)


//protected routes
router.post('/menu/add',verifyAdminToken,addItem);
router.get('/menu/list',verifyAdminToken,showItems);
router.put('/menu/update/:id',verifyAdminToken,updateItem);
router.delete('/menu/delete/:id',verifyAdminToken,deleteItem);

export default router;


