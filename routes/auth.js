const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

const { registerUser, loginUser,validateToken } = require('../controllers/auth');

router.post('/register', registerUser);
router.post('/login', loginUser );
router.post('/validate', validateToken)

module.exports = router;
