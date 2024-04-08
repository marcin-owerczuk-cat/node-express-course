const Users = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log(user);
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password');
  }

  const user = await Users.findOne({email});

  if(!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }
  if(!await bcrypt.compare(password, user.password)) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  const token = jwt.sign({ id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d'})

  res.status(StatusCodes.ACCEPTED).json({token: token});
}

module.exports = {
  register,
  login,
}
