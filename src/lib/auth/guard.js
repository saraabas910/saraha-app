import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function guard(req, res, next) {

   try {
     const token = req.cookies.access_token ;
    if (!token) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
   req.user = jwt.verify(token, process.env.JWT_SECRET);
   
    
    next();

 } catch (error) {
     error.statusCode = 401;
     next(error);
   }
}