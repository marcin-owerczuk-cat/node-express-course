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
    const task = await Tasks.findOne({_id: id});
    if(!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }
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
    const task = await Tasks.findOneAndUpdate({_id: id} , req.body, {new: true, runValidators: true});
    if(!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }
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
    const task = await Tasks.findOneAndDelete({_id: id});
    if(!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }
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