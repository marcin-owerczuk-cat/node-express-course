const jwt = require('jsonwebtoken');
const {
  UnauthorizedError,
  BadRequestError,
} = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    throw new BadRequestError('Please provide username and password');
  }

  if(username !== 'marcin' || password !== 'secret') {
    throw new UnauthorizedError('Wrong username or password');
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '30d'});
  res.status(200).json({token, msg: 'Fake login register signup'});
}

const dashboard = async (req, res) => {
  const {user} = req;
  const luckNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckNumber}`,
  });
}

module.exports = {
  login,
  dashboard,
}