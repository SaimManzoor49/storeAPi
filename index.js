require("dotenv").config();
require('express-async-errors')
const express = require("express");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const connectDB = require("./utils/connectDB");
const productsRouter = require('./routes/productsRoutes')

const PORT = 8080;
const app = express();

// Middlewares

app.use(express.json());

//routes

app.get("/", (req, res) => {
  res.send("<h1>helloWorld in our Store APi</h1>");
});

app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async() => {
  try {
    // connectDB
   await connectDB()
    app.listen(PORT, () => {
      console.log("server is listning on PORT: " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
