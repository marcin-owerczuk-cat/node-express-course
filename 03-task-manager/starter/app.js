
//create express app with router
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
//const connectDB = require('./db/connect');
//require('dotenv').config();
const notFound = require('./middleware/not-found');
//const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/tasks', tasks);
app.use(notFound);


app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);