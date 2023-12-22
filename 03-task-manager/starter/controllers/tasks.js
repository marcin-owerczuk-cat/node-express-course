const Tasks = require('../models/Task');
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({tasks});
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

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
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}