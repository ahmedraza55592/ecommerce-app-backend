// Imports
const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


// Router initialize
const authRouter = express.Router();


//Checking

authRouter.get("/", async (req, res) => {
    res.json("API is working!!!!!!!!");
});

authRouter.get("/check", async (req, res) => {
    res.json("Hey There ! API is working");
});



// Sign up API
authRouter.post("/api/signup", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({msg: "User with this email already exists!"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        let user = new User({
            name,
            email,
            password: hashedPassword,  
        });
        user = await user.save();
        res.json(user);
        
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})


// Sign In Api
authRouter.post("/api/signin", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "User with this email does not exits!"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Incorrect Password, Please enter the correct password"});
        }

        const token = jwt.sign({id: user._id}, process.env.TOKEN_KEY);
        res.json({token, ...user._doc});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
})

// check if token is valid or not

authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if(!token){
            return res.json(false);
        }
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        if(!verified){
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if(!user){
            return res.json(false);
        }
        res.json(true);
        
    } catch (e) {
        res.status(500).json({error: e.message});
        
    }
})

authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({...user._doc, token: req.token});
})

module.exports = authRouter;
