require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const DB = require("../api/config/db");
app.use(cors("*"))
app.use(express.json());
const PORT = 9000 || process.env.PORT
app.use("/v1/api", require("./router"))
app.listen(PORT, ()=>{
    console.log(`This port is running in ${PORT}`)
})
module.exports = app;