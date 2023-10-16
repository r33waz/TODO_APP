import express from 'express'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controller/todolist.controller.js'


const router = express.Router()
router.post("/todo", createTodo)
router.get("/gettodos", getAllTodos)
router.get("/gettodos/:id",getTodoById);
router.delete("/deletetodo/:id", deleteTodo);
router.patch("/updatetodo/:id",updateTodo)
export default router