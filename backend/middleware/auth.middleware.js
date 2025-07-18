// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// export const authenticateUser = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken; // Check if the token exists in cookies
//     console.log('Token from cookies:', token);

//     if (!token) {
//       return res.status(401).json({ message: 'No token provided' });
//     }

//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify the token
//     req.user = await User.findById(decoded.userId); // Attach user to req


//     if (!req.user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // console.log('Authenticated user:', req.user); // Log authenticated user

//     next(); // Move to the next middleware or route handler

//   } catch (error) {
//     console.error('Authentication error:', error.message);
    
//     // Handle token expiration specifically
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ message: 'Token expired. Please login again.' });
//     }

//     res.status(401).json({ message: 'Unauthorized. Invalid token.' });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};