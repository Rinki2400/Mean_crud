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
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if ID format is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    console.log("User ID received:", userId); // Debugging step

    const deleteUser = await User.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res
        .status(404)
        .json({ message: "User not found. Deletion failed." });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully.", deletedUser: deleteUser });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if ID format is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    // Validate incoming request body
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Update data is missing. Provide valid fields." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found. Update failed." });
    }

    res.status(200).json({ message: "User updated successfully.", updatedUser });

  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
