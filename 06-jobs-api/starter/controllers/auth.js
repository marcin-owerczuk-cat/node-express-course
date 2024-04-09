const Users = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {BadRequestError , UnauthenticatedError} = require('../errors');

const register = async (req, res) => {
  const user = await Users.create({...req.body});
  res.status(StatusCodes.CREATED).json(user);
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await Users.findOne({email});

  if(!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  if(!await bcrypt.compare(password, user.password)) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = jwt.sign({ id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'})

  res.status(StatusCodes.ACCEPTED).json({token: token});
}

module.exports = {
  register,
  login,
}
