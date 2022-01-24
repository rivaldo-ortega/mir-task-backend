const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
}=require("../controllers/tasks.controller")
router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTask).get(getTask).delete(deleteTask)

module.exports = router