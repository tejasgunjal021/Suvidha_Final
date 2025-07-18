import User from "../models/user.model.js";

// Controller function to get a user by their ID
export const getUserById = async (req, res) => {
    const { id } = req.params; // Extract userId from request params

    try {
        // Find the user by their ID
        const user = await User.findById(id).select('name email'); // Select only the fields you need (name, email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user details
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
