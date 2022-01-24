require("dotenv").config();
const connectDB=require("./db/conect")
const express = require('express');
const app = express();
const tasks = require('./routes/task.routes');
const notFound= require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');
const {customError}=require("./errors/custom-error")
//Middlewares
app.use(express.json())

//Routes
app.get('/hello', (req, res) => {
  res.send("Task manager app")
})
app.use("/api/tasks",tasks)
app.use(notFound)
app.use(errorHandler)
const PORT=process.env.PORT ||4000;

const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}
start();
