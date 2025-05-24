const express = require('express');
const router = express.Router();
const user = require('../models/User');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Signup Route
router.post('/signup', async (req, res) => {
    try {
        console.log("incoming signup request");
        console.log("Request body:", req.body);

const { username, email, password } = req.body;

console.log("Username:", username);
console.log("Email:", email);
console.log("Password:",password);

if (!username || !email || !password) {
    console.log("Missing field detected");
    return res.status(400).json({ message: 'All fields are required' });
}
const existingUser = await
User.findOne({ email });
console.log("Existing user result:", existingUser);

if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
}

const hashedPassword = await
bcrypt.hash(password, 10);
console.log("password hashed");

const newUser = new User({ username, email, password: hashedPassword });
await newUser.save();
console.log("New user saved");

res.status(201).json({ message: 'User created successfully' });

} catch (err) {
    console.error("Error in signup:", err);
    res.status(500).json({ message: 'Signup failed', error: err.message });
    }
})
//Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Request body:", req.body);

    console.log("Username:", username);

    try {
        const user = await
         User.findOne({ username });
            if (!user) {
                 return res.status(400).json({ message:
               "Invalid username" }); 
                 }        

                 const isPasswordValid = await
                    bcrypt.compare(password, user.password);
                    if (!isPasswordValid) {
                         return res.status(400).json({ message: 'Invalid password' });
                    }
                    
            const token = jwt.sign({ id: user._id }, 
                process.env.JWT_SECRET, { 
                    expiresIn: '1h',
                });

                    res.status(200).json({ message: 'Login successful', token });

    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ message: "Login failed", error: err.message });
    }
})

module.exports = router;