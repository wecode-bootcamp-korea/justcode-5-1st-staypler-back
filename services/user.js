const userRepository = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function signup(user) {}

function login(email, password) {}

module.exports = { signup, login };
