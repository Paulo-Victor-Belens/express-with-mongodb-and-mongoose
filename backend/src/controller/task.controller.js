const TaskService = require('../service/task.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createTask = async (req, res) => {
    try {
    const { title, description, status } = req.body;
    const { status: status2, data } = await TaskService.createTask(title, description, status);
    if (!data) {
        return res.status(mapStatusHTTP(status2)).end();
    }
    return res.status(mapStatusHTTP(status2)).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const { status, data } = await TaskService.getAllTasks();
        return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, data } = await TaskService.getTaskById(id);
        return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const { status: status2, data } = await TaskService
            .updateTask(id, title, description, status);
        return res.status(mapStatusHTTP(status2)).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, data } = await TaskService.deleteTask(id);
        return res.status(mapStatusHTTP(status)).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};