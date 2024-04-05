require('dotenv').config();

const connectDb = require('./db/connect');

const Products = require('./models/Product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    console.log('populating db');
    await connectDb(process.env.DB_URL);
    console.log('connected to db');
    console.log('deleting all products');
    await Products.deleteMany();
    console.log('populating products');
    await Products.create(jsonProducts);
    console.log('Success!!!!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

start();