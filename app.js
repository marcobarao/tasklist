const _ = require("lodash");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const validation = (req, res, next) => {
  let task = req.body.task;
  if (_.isEmpty(task)) return res.status(404).json("Task is empty");
  return next();
};

let taskList = [];
app.get("/tasks", (req, res) => {
  res.json(taskList);
});

app.post("/tasks", [
  validation,
  (req, res) => {
    let task = req.body.task;
    taskList.push(task);
    res.json(taskList);
  }
]);

app.put("/tasks/:task_id", [
  validation,
  (req, res) => {
    let taskId = req.params.task_id;
    taskList[taskId] = req.body.task;
    res.json(taskList);
  }
]);

app.delete("/tasks/:task_id", (req, res) => {
  let taskId = req.params.task_id;
  taskList.splice(taskId, 1);
  res.json(taskList);
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server is listening in ${process.env.HOST}:${process.env.PORT}`);
});
