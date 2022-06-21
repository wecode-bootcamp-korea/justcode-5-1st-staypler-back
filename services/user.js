import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userRepository from '../models/user.js';

dotenv.config();

function signup(user) {}

function login(email, password) {}

module.exports = { signup, login };
