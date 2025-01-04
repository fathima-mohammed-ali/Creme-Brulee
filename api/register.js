import bcrypt from 'bcrypt';
import userModel from '../../server/src/model/userModel';
import loginModel from '../../server/src/model/loginModel';

// Assuming you're going to handle authentication in the future
// For now, we will ignore the checkAuth middleware (as it's not used in the serverless function)

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
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

            // Hash the password
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            // Set role (defaults to 'user' if not provided)
            let role = req.body.role || 'user';

            // Check if the role should be 'admin' and validate if the user is admin
            // Note: This part can be adjusted to integrate future authentication/authorization middleware
            // if (role === 'admin' && req.userData.role !== 'admin') {
            //     return res.status(403).json({
            //         success: false,
            //         error: true,
            //         message: "Only admins can create other admins"
            //     });
            // }

            // Create login details for the user
            const login_user = {
                username: req.body.username,
                password: hashedPassword,
                role: role
            };

            // Save login details in the login collection
            const login = await loginModel(login_user).save();

            if (login) {
                // Create user details, linked with the login information
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
            console.error(error);
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

