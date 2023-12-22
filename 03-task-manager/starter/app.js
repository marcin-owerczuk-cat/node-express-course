const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
//const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('./public'));


app.use('/api/v1/tasks', tasks);
app.use(notFound);

const start = async () => {
  try {
    await connectDb(process.env.DB_URL);
    console.log('Connected to database');
    app.listen(port, async () => {
        console.log(`Server is listening on port ${port}...`);
        const Tasks = require('./models/Task');
        Tasks.create({name: 'Task 1111', completed: true});
      }
    );
  } catch (error) {
    console.log(error);
  }
}

start();
