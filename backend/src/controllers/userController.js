const User = require('../models/userModel'); // Adjust the path as needed

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {  
    try {  
        const users = await User.find();  
        res.status(200).json(users);  
    } catch (err) {  
        console.error("Error fetching users:", err.message); // Debugging log
        res.status(500).json({ error: "Internal Server Error" });  
    }  
};
//  exports.deleteUser = async (req,res) =>{
//     try {
//         const userId = req.params.id
//         const deleteUser = await User.findByIdAndDelete(userId)
//         if(!deleteUser) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting user:", error.message); 
//         res.status(500).json({ error: "Internal Server Error" });
//     }
//  }