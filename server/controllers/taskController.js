const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, status, projectId } = req.body;
  const task = await Task.create({ title, description, status, projectId });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const { projectId } = req.params;
  const tasks = await Task.find({ projectId });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
