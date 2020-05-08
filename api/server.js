//express then server followed by middleware then routes requiring the router files
const express = require("express");
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const { logger } = require("../data/helpers/loggerMid");
const projectsRouter = require("../routes/projectsRouter");
const actionsRouter = require("../routes/actionsRouter");

// Middleware
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(logger);
server.use(express.json());


server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;