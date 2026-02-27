import User from"../models/userModel.js";
import bcrypt from"bcryptjs";
import jwt from"jsonwebtoken";

export const registerUser=async(req,res)=>{
  try{
    const{
        name,
        email,
        password
    }=req.body;

    const userExists=await User.findOne(
        {email:email}
    );

    if(userExists){
        return res.status(400).json({msg:"Email already used"});
    }

    const hashed=await bcrypt.hash(password,10);

    const user=await User.create({
        name:name,
        email:email,
        password:hashed
    });

    res.json({
        msg:"User registered",user:user
    });

  }catch(err){
    res.status(500).json({
        msg:err.message
    });
  }
};

export const loginUser=async(req,res)=>{
  try{
    const{email,password}=req.body;

    const user=await User.findOne(
        {email:email}
    );

    if(!user){
        return res.status(400).json(
            {msg:"User not found"}
        );
    }

    const match=await bcrypt.compare(password,user.password);

    if(!match){
        return res.status(400).json({
            msg:"Invalid password"
        });
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.json({
        msg:"Login success",token:token
    });

  }catch(err){
    res.status(500).json({
        msg:err.message
    });
  }
};