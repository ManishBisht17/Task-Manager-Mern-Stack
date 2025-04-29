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
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ userId: req.user._id });
  res.json(projects);
};
