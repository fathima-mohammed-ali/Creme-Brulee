import bcrypt from 'bcrypt';
import userModel from '../server/src/models/userModel.js';
import loginModel from '../server/src/models/loginModel.js';
import connectDB from '../api/connectDB.js';  // Assuming you have a DB connection handler

// Serverless function to handle user registration
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            // Ensure database connection is established
            await connectDB();

            // Check if the username already exists
            const oldUser = await loginModel.findOne({ username: req.body.username });
            if (oldUser) {
                return res.status(409).json({
                    success: false,
                    error: true,
                    message: "Username already exists"
                });
            }

            // Check if the email already exists
            const oldEmail = await userModel.findOne({ email: req.body.email });
            if (oldEmail) {
                return res.status(409).json({
                    success: false,
                    error: true,
                    message: "Email already exists"
                });
            }

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            // Set role (defaults to 'user' if not provided)
            let role = req.body.role || 'user';

            // Create login details for the user
            const login_user = {
                username: req.body.username,
                password: hashedPassword,
                role: role
            };

            // Save login details in the login collection
            const login = await loginModel(login_user).save();

            if (login) {
                // Create user details linked to the login information
                const userdetails = {
                    loginID: login._id,
                    email: req.body.email,
                };

                const usersave = await userModel(userdetails).save();

                if (usersave) {
                    return res.status(200).json({
                        success: true,
                        error: false,
                        message: "Registration completed successfully"
                    });
                } else {
                    return res.status(500).json({
                        success: false,
                        error: true,
                        message: "User creation failed"
                    });
                }
            } else {
                return res.status(500).json({
                    success: false,
                    error: true,
                    message: "Login details saving failed"
                });
            }

        } catch (error) {
            console.error('Registration Error:', error);
            return res.status(500).json({
                success: false,
                error: true,
                message: "Something went wrong"
            });
        }
    } else {
        return res.status(405).json({
            success: false,
            error: true,
            message: "Method Not Allowed"
        });
    }
}
