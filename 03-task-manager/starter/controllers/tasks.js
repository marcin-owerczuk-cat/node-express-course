const Tasks = [{
  id: 1,
  name: 'Task 1',
  completed: false,
  description: 'Task 1 description',
}, {
  id: 2,
  name: 'Task 2',
  completed: true,
  description: 'Task 2 description',
}];

const getTasks = (req, res) => {
    try {
        const tasks = Tasks;
        res.status(200).json(tasks);
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
const createTask = (req, res) => {
    try {
        const {name} = req.body;
        const newTask = {
            id: Tasks.length + 1,
            name,
            done: false,
        }
        Tasks.push(newTask);
        console.log(newTask);
        res.status(201).json(newTask);
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