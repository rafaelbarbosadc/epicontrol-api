const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");
const cors = require("cors");

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();

    this.express.listen(80, () => console.log(`Server is running at 3001`));
  }

  database() {
    mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
module.exports = new App().express;
