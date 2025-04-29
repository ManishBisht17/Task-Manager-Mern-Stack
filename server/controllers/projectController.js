const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { title } = req.body;
  const userId = req.user._id;

  const count = await Project.countDocuments({ userId });
  if (count >= 4)
    return res.status(400).json({ error: "Only 4 projects allowed" });

  const project = await Project.create({ title, userId });
  res.status(201).json(project);
};
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete();
  res.json({
    message: "project deleted successfully",
  });
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
};
