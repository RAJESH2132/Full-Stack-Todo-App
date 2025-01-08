const router = require("express").Router();
const Task = require("../models/todoModel");

//Get all tasks
router.get("/getTodoList", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Add new task
router.post("/addTodoList", async (req, res) => {
  try {
    const task = await Task.create({
      task: req.body.task,
      status: req.body.status,
      deadline: req.body.deadline,
    });
    res.json(task);
  } catch (error) {
    res.json(error);
  }
});

//Update task
router.put("/updateTodoList/:id", async (req, res) => {
  const id = req.params.id;
  const Data = {
    task: req.body.task,
    status: req.body.status,
    deadline: req.body.deadline,
  };
  try {
    const updatedData = await Task.findByIdAndUpdate(id, Data);
    res.json(updatedData);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/deleteTodoList/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteTodo = await Task.findByIdAndDelete(id);
    res.json(delteTodo);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
