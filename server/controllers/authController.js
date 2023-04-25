const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Function to handle user login
exports.loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Check if the user exists
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET, // Replace with your actual JWT secret
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            token
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred during login'
        });
    }
};