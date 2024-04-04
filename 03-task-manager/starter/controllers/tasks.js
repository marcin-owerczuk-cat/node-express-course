const Tasks = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Tasks.find();
    res.status(200).json({tasks});
  });


const getTask = asyncWrapper(async (req, res) => {
    const {id} = req.params;
    const task = await Tasks.findOne({_id: id});
    if(!task) {
      return res.status(404).json({
        error: 'Task not found'
      });
    }
    res.status(200).json({task});
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({task});
})

const updateTask = asyncWrapper(async (req, res) => {
  const {id} = req.params;
  const task = await Tasks.findOneAndUpdate({_id: id} , req.body, {new: true, runValidators: true});
  if(!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }
  res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req, res) => {
  const {id} = req.params;
  console.log(`deleting ${id}`);
  const task = await Tasks.findOneAndDelete({_id: id});
  if(!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }
  res.status(200).json({task});
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}