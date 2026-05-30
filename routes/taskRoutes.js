import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/taskController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/toggle", authMiddleware, toggleTask);

export default router;