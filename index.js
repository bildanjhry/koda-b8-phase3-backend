import express from "express"
import routes from "./src/routes/index.js"

const app = express()
app.use(express.urlencoded())
app.use(routes)

const PORT = process.env.PORT || 8082
app.listen(PORT, function(){
    console.log("Listen to port "+PORT)
})