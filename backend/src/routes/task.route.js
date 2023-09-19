const express = require('express');
const taskController = require('../controller/task.controller');
const validateTask = require('../middleware/taskValidation');

const taskRouter = express.Router();

taskRouter.delete('/:id', taskController.deleteTask);
taskRouter.put('/:id', validateTask, taskController.updateTask);
taskRouter.get('/:id', taskController.getTaskById);
taskRouter.get('/', taskController.getAllTasks);
taskRouter.post('/', taskController.createTask);

module.exports = taskRouter;
