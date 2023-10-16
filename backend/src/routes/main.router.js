import express from 'express'
import  todoroute  from '../routes/todolist.routes.js'

const router = express.Router()

router.use("/api/v1", todoroute);
export default router