const User = require("../models/userModel"); // Adjust the path as needed

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // Check if users exist
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found in the database." });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    // Enhanced error handling
    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation Error", errors: err.errors });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
exports.getByUsersId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found. Deletion failed." });
    }
    res.status(200).json({ message: "User deleted successfully.", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

