import jwt from 'jsonwebtoken'


export const  verifyAdminToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({message:"No token Provided"});

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        next();
    }catch(error){
        console.log("error in middleware", error);
        res.status(403).json({message:"invalid or expired token"});
    }

}