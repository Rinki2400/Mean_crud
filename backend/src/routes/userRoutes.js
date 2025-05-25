const express = require('express');
const { createUser, getAllUsers, deleteUser ,updateUser,getByUsersId } = require('../controllers/userController');

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getAllUsers);
router.get('/user/:id', getByUsersId);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser); 

module.exports = router;