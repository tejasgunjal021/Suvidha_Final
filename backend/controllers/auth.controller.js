import User from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Import Nodemailer

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your SMTP username
    pass: process.env.SMTP_PASS, // Your SMTP password
  },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Generate access token and refresh token
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// Store refresh token in Redis for 7 days
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_Token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};


// Send OTP email
const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending OTP email:", error);
    } else {
      console.log("OTP email sent:", info.response);
    }
  });
};

// Send welcome email
const sendWelcomeEmail = (email, name) => {
  const mailOptions = {
    from: process.env.SMTP_USER, // Sender address
    to: email, // List of receivers
    subject: "Welcome to Our Service!", // Subject line
    text: `Hello ${name},\n\nThank you for signing up! We're thrilled to have you on board and to be part of your journey. At Suvidha, we strive to make your experience enjoyable and fulfilling.\n\nIf you have any questions or need assistance, feel free to reach out. We're here to help!\n\nBest wishes,\nThe Suvidha Team`// Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log("Sending OTP to:", email);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in Redis with a 10-minute expiration
    const result = await redis.set(`otp:${email}`, otp, "EX", 10 * 60);

    // console.log("Stored OTP:", result);
    // Send OTP via email
    sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};


export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const storedOTP = await redis.get(`otp:${email}`);
    if (!storedOTP || storedOTP !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP is valid, proceed with further logic (e.g., user signup)
    return res.status(200).json({success: true, message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email }); // Check if user exists

    if (userExists) return res.status(400).json({ message: "User already exists" });
    
    const user = await User.create({ name, email, password }); // Create new user

    // Authenticate
    const { accessToken, refreshToken } = generateTokens(user._id);
    await storeRefreshToken(user._id, refreshToken); // Store refresh token in Redis
    setCookies(res, accessToken, refreshToken);
    
    // Send welcome email
    sendWelcomeEmail(email, name); // Send email after user creation

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Signup error controller", error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});  //check if user exists

    if(!user) return res.status(400).json({message: "User does not exist"});

    if(user && (await user.comparePassword(password)) ){
      const {accessToken, refreshToken} = generateTokens(user._id);

      await storeRefreshToken(user._id, refreshToken); //store refresh token in redis

      setCookies(res, accessToken, refreshToken);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(401).json({message: "Invalid credentials"});
    }
  } catch (error) {
    res.status(500).json({message: "Login error controller", error: error.message});
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_Token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({message: "Logged out successfully"});
  } catch (error) {
    res.status(500).json({message: "Logout error controller", error: error.message});
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
      console.error("Refresh token verification failed:", error.message);
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const storedToken = await redis.get(`refresh_Token:${decoded.userId}`);
    
    // Debugging logs
    console.log("Stored Token:", storedToken);
    console.log("Provided Token:", refreshToken);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

    // Set cookies for both tokens
    setCookies(res, accessToken, refreshToken); // Set the refresh token again in the cookie

    res.json({ message: "Refresh token generated successfully", accessToken });
  } catch (error) {
    console.error("Error in refresh token controller:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user contains the authenticated user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      _id: user._id,
       name: user.name,
       email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User role updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Update user details
export const updateUser = async (req, res) => {
  const userId = req.user.id; // Get the user ID from the authenticated user
  const { name, email } = req.body; // Get new name and email from request body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true } // Ensure validation is run
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    // Assuming the user is available in req.user from the middleware
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the password
    user.password = newPassword; // Assuming you have a method to hash it
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};



