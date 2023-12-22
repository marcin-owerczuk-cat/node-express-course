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
const getTask = async (req, res) => {
  try {
    const {id} = req.params;
    const task = await Tasks.findById(id);
    res.status(200).json({task});
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
const updateTask = async (req, res) => {
  try {
    const {id} = req.params;
    const {name, completed} = req.body;
    const task = await Tasks.findByIdAndUpdate(id, {name, completed}, {new: true});
    res.status(200).json({task});
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
//deleteTask,
const deleteTask = async (req, res) => {

  try {
    const {id} = req.params;
    console.log(`deleting ${id}`);
    await Tasks.findByIdAndDelete(id);
    res.send('OK').status(200);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}