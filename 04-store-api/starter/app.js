require('dotenv').config();

const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const connectDB = require("./db/connect");
const productRouter = require('./routes/products');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Products</h1><a href="/api/v1/products">Products list</a>');
})

app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
}

start();
