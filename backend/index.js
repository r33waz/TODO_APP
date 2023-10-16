import express from 'express'
import 'dotenv/config'
import CORS from 'cors'
import { DBconnect } from './src/config/db.config.js'
import mainRouter from './src/routes/main.router.js'

const app = express()

DBconnect()
app.use(express.json())
app.use(CORS())
app.use(mainRouter)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})


