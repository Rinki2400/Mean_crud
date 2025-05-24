const express = require('express');
const { createUser } = require('../controllers/userController'); // Import controller

const router = express.Router();

// Correctly use createUser function
router.post('/', createUser);

module.exports = router;