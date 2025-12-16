import { use } from "react";
import { prisma } from "../config/db.js";
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils/generateToken.js'


const register =async (req, res) => {
    // Registration logic here
  const {email,password,name}=req.body;
   const userExists= await prisma.user.findUnique({
    where:{
        email:email 
    }
   });
    if(userExists){
        return res.status(400).json({message:"User already exists"});
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    const user= await prisma.user.create({
        data:{
            email,
            password:hashedPassword,
            name
        }
    });
     const token=generateToken(user.id,res);

    res
    .status(201)
    .json({
        status:"success",
        message:"User registered successfully",
        data:{ user:{
            id:user.id,email:user.email,name:user.name,password:user.password
        },
        token,
    },
       });


};

const login= async(req,res)=>{

  const {email,password}=req.body;
   const user= await prisma.user.findUnique({
    where:{
        email:email 
    }
});


if(!user){
    return res.status(401).json({error:'invalid email or password'})
}

 const isPasswordValid= await bcrypt.compare(password, user.password);

 if(!isPasswordValid){
    return res.status(401).json({error:'invalid email or password'})

 }

 const token=generateToken(user.id,res);
   res
    .status(201)
    .json({
        status:"success",
        message:"User login successfully",
        data:{ user:{
            id:user.id,email:user.email,password:user.password
        },
        token,
    },
       });
};

const logout=async (req,res)=>{
    res.cookie("jwt","",{
        httpOnly:true,
        exprires:new Date(0),
    });

    res.status(200).json({
        status:"success",
        message: 'logged out successfully'
    });
};
export { register,login ,logout};