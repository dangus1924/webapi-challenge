const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const projectRouter = require("../api/routes/projectsRouter");
const actionRouter = require("../api/routes/actionsRouter");

const server = express();


server.use(express.json(), helmet(), morgan("tiny"));

server.get("/", (req, res) => {
  res.json({ Check: "working", envMessage: process.env.MESSAGE || "env not working/undefined" });
});


server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);


server.use((req, res) => res.status(404).json({ error: "route not found" }));

server.use((err, req, res, next) => {
  const { statusCode, errorMessage, originalError } = err;
  res
    .status(statusCode || 500)
    .json({ errorMessage: errorMessage || "some error occurred, please try again later", originalError });
});

module.exports = server;