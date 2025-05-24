const express = require('express');
const { createUser,getAllUsers} = require('../controllers/userController'); // Import controller

const router = express.Router();

// Correctly use createUser function
router.post('/', createUser);
router.get('/', getAllUsers);

module.exports = router;