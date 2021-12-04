const express=require('express');
const {body , validationResult,check}=require("express-validator")
const router=express.Router();



const User= require("../models/user.model")


router.post('/',
body("first_name").isLength({min:1}).withMessage("firstName is required"),
body("last_name").isLength({min:1}).withMessage("last name is required"),
body("email").isEmail().withMessage("Please enter valid email"),
body("pincode").isLength({min:6,max:6}).withMessage("please enter valid pincode"),

body("age").isLength({min:1,max:100}).withMessage("please enter valid age between 1 and 100"),
body("gender").isLength({min:1}).withMessage("please ender valid gender "),
check("gender").isIn(["Female","Male","male","female","others","Others"]),


async(req,res)=>{

    const errors=validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({data:errors.array()})
     }

try{

    const user = await User.create(req.body);

   return res.status(201).json({data:user})

   console.log('sending an item')

}

catch{
    return res.status(500).json({message:e.message,status:"Failed"})
}
})


module.exports=router;