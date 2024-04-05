const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  if(!username || !password) {
    throw new CustomAPIError('Provide login and password', 400);
  }

  if(username !== 'marcin' || password !== 'secret') {
    throw new CustomAPIError('Wrong credentials', 401);
  }
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '30d'});
  res.status(200).json({token, msg: 'Fake login register signup'});
}

const dashboard = async (req, res) => {
  const luckNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckNumber}`,
  });
}

module.exports = {
  login,
  dashboard,
}