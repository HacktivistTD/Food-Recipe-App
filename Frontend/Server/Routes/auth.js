const express = require('express');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken')



const router = express.Router();



// Mark the function as async to use await
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user already exists
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.json({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({ username, password: hashPassword });
        await newUser.save();

        // Respond with success message
        return res.json({ message: "Record saved" });
    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/login',async(req,res)=>{
    const{username,password}=req.body;
    const user=await UserModel.findOne({username});
    if(!user){
        return res.json ({message:"Wrong credentials"})
    }

    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) {
        return res.json({message:"Wrong Credentials"})
    }

    const token = jwt.sign({id:user._id},"secret");
    res.cookie("token",token)
    return res.json({message:"Successfully login", id:user._id})

    

})
module.exports = router;
