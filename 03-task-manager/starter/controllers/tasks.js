const Tasks = require('../models/Task');
const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

//getTask,
const getTask = (req, res) => {
    try {
        const {id} = req.params;
        const task = Tasks.find(task => task.id === parseInt(id));
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

//createTask,
const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json({task});
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
//updateTask,
const updateTask = (req, res) => {
    try {
        const {id} = req.params;
        const {name, done} = req.body;
        const task = Tasks.find(task => task.id === parseInt(id));
        task.name = name;
        task.done = done;
        console.log(task)
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
//deleteTask,
const deleteTask = (req, res) => {
    const { id } = req.params;
    console.log(`deleting ${id}`);
    res.send('OK').status(200);

}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}