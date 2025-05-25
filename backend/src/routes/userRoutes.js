const express = require('express');
const { createUser, getAllUsers, deleteUser ,updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser); 

module.exports = router;