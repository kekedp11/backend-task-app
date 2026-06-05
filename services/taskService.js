import Task from "../models/Task.js";

export async function getAllTasks(
  userId,
  page,
  limit,
  search
) {
  const skip = (page - 1) * limit;

  return await Task.find({
    userId,
    title: {
      $regex: search,
      $options: "i",
    },
  })
    .skip(skip)
    .limit(limit);
}

export async function createNewTask(
  title,
  dueDate,
  userId
) {
  if (!title || title.trim() === "") {
    throw new Error("Title wajib diisi");
  }

  const newTask = new Task({
    title,
    dueDate,
    userId,
  });

  return await newTask.save();
}

export async function updateExistingTask(
  id,
  title,
  dueDate,
  userId
) {
  if (!title || title.trim() === "") {
    throw new Error("Title wajib diisi");
  }

  return await Task.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      title,
      dueDate,
    },
    {
      returnDocument: "after",
    }
  );
}

export async function deleteExistingTask(
  id,
  userId
) {
  return await Task.findOneAndDelete({
    _id: id,
    userId,
  });
}

export async function toggleTaskCompleted(
  id,
  userId
) {
  const task = await Task.findOne({
    _id: id,
    userId,
  });

  return await Task.findOneAndUpdate(
    {
      _id: id,
      userId,
    },
    {
      completed: !task.completed,
    },
    {
      returnDocument: "after",
    }
  );
}