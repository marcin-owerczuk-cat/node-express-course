//import router
const express = require('express');
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,

} = require("../controllers/tasks");

const router = express.Router();

router.route('/')
    .get(getTasks)
    .post(createTask);

router.route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

module.exports = router;


