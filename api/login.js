import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../server/src/models/userModel.js';  // Update paths to match your project structure
import loginModel from '../server/src/models/loginModel.js';  // Update paths to match your project structure

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await userLogin(req, res);
    } else {
        return res.status(405).json({ success: false, error: true, message: 'Method Not Allowed' });
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log("Received body:", req.body);

        if (username && password) {
            // Find the user by username
            const oldUser = await loginModel.findOne({ username });
            if (!oldUser) {
                return res.status(400).json({ success: false, error: true, message: "The user does not exist" });
            }

            // Check the password
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ success: false, error: true, message: "Incorrect Password" });
            }

            // User login logic based on role
            if (oldUser.role === "user") {
                // Logic for regular user login
                const userData = await userModel.findOne({ loginID: oldUser._id });
                const token = jwt.sign(
                    {
                        role: oldUser.role,
                        loginid: oldUser._id,
                        userId: userData._id,
                        userEmail: userData.email,
                    },
                    process.env.JWT_SECRET_KEY || "unknown", // Use a secure secret key, ideally from an env variable
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    success: true,
                    error: false,
                    token: token,
                    role: oldUser.role,
                    loginid: oldUser._id,
                    userId: userData._id,
                    userEmail: userData.email,
                });
            } else if (oldUser.role === "admin") {
                // Logic for admin login
                const token = jwt.sign(
                    {
                        role: oldUser.role,
                        loginid: oldUser._id,
                        username: oldUser.username,
                    },
                    process.env.JWT_SECRET_KEY || "unknown", // Use a secure secret key, ideally from an env variable
                    { expiresIn: "1h" }
                );
                return res.status(200).json({
                    success: true,
                    error: false,
                    token: token,
                    role: oldUser.role,
                    loginid: oldUser._id,
                    username: oldUser.username,
                });
            } else {
                return res.status(400).json({ success: false, error: true, message: "Role not recognized" });
            }
        } else {
            return res.status(400).json({ success: false, error: true, message: "Username and password are required" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, error: true, message: "An internal error occurred" });
    }
}

