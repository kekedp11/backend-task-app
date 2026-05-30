import Task from "../models/Task.js";

export async function getAllTasks() {
  return await Task.find();
}

export async function createNewTask(title, dueDate) {
  if (!title || title.trim() === "") {
    throw new Error("Title wajib diisi");
  }

  const newTask = new Task({
    title,
    dueDate,
  });

  return await newTask.save();
}

export async function updateExistingTask(
  id,
  title,
  dueDate
) {
  if (!title || title.trim() === "") {
    throw new Error("Title wajib diisi");
  }

  return await Task.findByIdAndUpdate(
    id,
    {
      title,
      dueDate,
    },
    {
      returnDocument: "after",
    }
  );
}

export async function deleteExistingTask(id) {
  return await Task.findByIdAndDelete(id);
}

export async function toggleTaskCompleted(id) {
  const task = await Task.findById(id);

  return await Task.findByIdAndUpdate(
    id,
    {
      completed: !task.completed,
    },
    {
      returnDocument: "after",
    }
  );
}