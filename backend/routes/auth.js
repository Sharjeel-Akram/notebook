const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
var fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "Sharjeel-8162"
 
//ROUTE 1: Sign Up
router.post('/createuser',
   [body('name', 'Enter a valid name').isLength({min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({min:5})],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let user = await User.findOne({ email: req.body.email });
    if(user){
      return res.status(400).json({error: "Sorry! This email already exists"})
    }
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    })
    const data = {
      user:{
        id: user.id
      }
    }
    const auth_token = jwt.sign(data, JWT_SECRET);
    res.json({"message": "User created successfully"})
    res.json({auth_token})
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//ROUTE 2: Login
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be Blank').exists()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        res.status(400).json({ error: "Please try to login with valid credentials" });
      }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      res.status(400).json({ error: "Please try to login with valid credentials" });
    }
    const payload = {
      user:{
        id: user.id
      }
    }
    const auth_token = jwt.sign(payload, JWT_SECRET);
    res.json({auth_token})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})



// ROUTE 3: Get User Details 
router.post('/getuser', fetchuser,  async (req, res) => {
try {
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
  })
module.exports = router;
