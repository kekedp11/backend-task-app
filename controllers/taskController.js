import {
  getAllTasks,
  createNewTask,
  updateExistingTask,
  deleteExistingTask,
  toggleTaskCompleted,
} from "../services/taskService.js";

export async function getTasks(req, res) {
  const tasks = await getAllTasks();

  res.json(tasks);
}

export async function createTask(req, res) {
  try {
    const newTask = await createNewTask(
      req.body.title,
      req.body.dueDate
    );

    res.status(201).json({
      message: "Task berhasil ditambah",
      data: newTask,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function updateTask(req, res) {
  try {
    const updatedTask = await updateExistingTask(
      req.params.id,
      req.body.title,
      req.body.dueDate
    );

    res.json({
      message: "Task berhasil diupdate",
      data: updatedTask,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function deleteTask(req, res) {
  await deleteExistingTask(req.params.id);

  res.json({
    message: "Task berhasil dihapus",
  });
}

export async function toggleTask(req, res) {
  const updatedTask = await toggleTaskCompleted(req.params.id);

  res.json({
    message: "Status task berhasil diubah",
    data: updatedTask,
  });
}