const Task = require('../model/task.model');

const createTask = async (title, description, status) => {
  if (status && status !== 'pending') {
    return { status: 'INVALID_VALUE', data: ({ message: 'Status must be pending' }) };
  }
    await Task.create({ title, description, status });
    return { status: 'CREATED' };
};

const getAllTasks = async () => {
    const tasks = await Task.find({});
    if (tasks.length === 0) {
        return { status: 'NOT_FOUND', data: [] };
    }
    return { status: 'SUCCESSFUL', data: tasks };
};

const msgNotFound = 'Task not found';

const getTaskById = async (id) => {
  try {
    const taskById = await Task.findById(id);
    return { status: 'SUCCESSFUL', data: taskById };
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: msgNotFound } };
  }
};

const allowedUpdates = ['pending', 'ongoing', 'completed'];

const updateTask = async (id, title, description, status) => {
  const isUpdate = status ? allowedUpdates.includes(status) : false;
  if (!isUpdate) {
    return { status: 'INVALID_VALUE', 
    data: { message: 'Status must be pending, ongoing or completed' },
    };
  }

  const taskById = await Task.findById(id);
  if (!taskById) {
    return { status: 'NOT_FOUND', data: { message: msgNotFound } };
  }
  const updatedTask = await Task
    .findByIdAndUpdate(id, { title, description, status }, { new: true, runValidators: true });

  return { status: 'SUCCESSFUL', data: updatedTask };
};

const deleteTask = async (id) => {
  try {
    await Task.findByIdAndDelete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Task deleted' } };
  } catch (error) {
    return { status: 'NOT_FOUND', data: { message: msgNotFound } };
  }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};