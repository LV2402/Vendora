import exp from 'express';
const sellerApp = exp.Router();
import SellerModel from '../models/sellerModel.js';
import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

sellerApp.use(exp.json());

dotenv.config();
let jwt_secret = process.env.JWT_SECRET;


//register
sellerApp.post("/signup",async(req,res)=>{
    try{
        //get the seller details from request body
        let newSeller=req.body;
        //hash the password
        let hashedPassword=await bcryptjs.hash(newSeller.password,10)
        //replace the password with hashed password
        newSeller.password=hashedPassword;
        //create a new seller document
        let newSellerDoc=new SellerModel(newSeller);
        //save the new seller document to the database
        await newSellerDoc.save();
        res.send({message:"seller created successfully"})
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})

//login
sellerApp.post("/signin",async(req,res)=>{
    try{
        let sellerCred=req.body;
        let seller=await SellerModel.findOne({sellername:sellerCred.sellername});
        if(seller==null){
            res.send({message:"invalid sellername"})
        }else{
            let result=await bcryptjs.compare(sellerCred.password,seller.password);
            if(result==false){
                res.send({message:"invalid password"})
            }else{
                let signedToken = jwt.sign({sellername:seller.sellername},jwt_secret,{expiresIn:"1d"})
                res.send({message:"login successful",token:signedToken,sellerId: seller._id,seller:seller})
            }
        }
    }catch(err){
        res.send({message:"error",payload:err.message})
    }
})


export default sellerApp;