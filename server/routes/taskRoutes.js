const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  deleteAllTasks,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.delete("/tasks/project/:projectId", deleteAllTasks);

module.exports = router;
