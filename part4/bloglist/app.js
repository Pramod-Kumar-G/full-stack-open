const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { errorHandler, unknownEndpoint } = require("./utils/middleware");

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
