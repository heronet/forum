const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User")

/// Sign in user
exports.signupUser = async (req, res, next) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Prototype an user
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        // Create an user
        const createdUser = await User.create(user);
        res.status(201).json(createdUser);
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: error.message});
    }
}
/// Sign Up user
exports.signinUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);
        let token;
        // Grant access only if the password is valid
        if(passwordIsValid) {
            // Sign token with email and ID as they can be useful later on.
            token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET);
            res.status(200).json({token});
        } else {
            // Access denied
            res.status(401).json({success: false, message: 'Access denied'});
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({success: false, error: error.message});
    }
}