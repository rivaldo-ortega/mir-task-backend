const Task = require("../models/task.model");
const asyncWrapper = require("../middlewares/async");
const {customError}=require("../errors/custom-error")
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(201).json({ tasks });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findById({ _id: taskId });
  if (!task) {
    return res.send.status(404).json({ msg: "Not found" });
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.send.status(404).json({ msg: `No found task for Id ${taskId}` });
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return res.send.status(404).json({ msg: "Not found task ,cant delete it" });
  }
  res.status(201).json({ task });
});

module.exports = { getAllTasks, createTask, deleteTask, updateTask, getTask };
