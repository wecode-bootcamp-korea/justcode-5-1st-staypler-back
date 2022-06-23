const jwt = require('jsonwebtoken');
const userDao = require('../models/user.js');

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization || '';
    if(!token || token === '') {
        res.status(404).json({ message: 'USER_NOT_FOUND' });
        return;
    }

    const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log(user);
    const checkUser = await user.getUserIdbyId(
        user.id[0] ? user.id[0].id : ''
    );

    req.userId = user.id[0].id;

    next();
};

module.exports = {validateToken};