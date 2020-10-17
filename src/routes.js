const express = require("express");
const TestController = require("./app/controllers/Test");
const UserController = require("./app/controllers/User");
const routes = express.Router();

// Tests
routes.get("/test", TestController.list);
routes.post("/test", TestController.create);
routes.get("/testsByResult", TestController.testsByResult);

// Users
routes.post("/user", UserController.create);
routes.patch("/user/:id", UserController.update);
routes.delete("/user/:id", UserController.delete);

module.exports = routes;
