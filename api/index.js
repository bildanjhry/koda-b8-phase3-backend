import express from "express"
import routes from "../src/routes/index.js"
import cookieParser from "cookie-parser"
import corsMiddleware from "../src/middlewares/cors.js"

const app = express()
app.use(express.urlencoded())
app.use(corsMiddleware)
app.use(cookieParser())
app.use(routes)

export default app