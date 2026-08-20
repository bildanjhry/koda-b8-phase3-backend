import app from "./api/index.js";

const PORT = process.env.PORT || 8082

app.listen(PORT, () => {
    console.log(`Listen to port ${PORT}`)
})