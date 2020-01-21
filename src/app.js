/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2020-01-19 11:34:18
 * @modify date 2020-01-19 11:34:18
 * @desc Main app definitions.
 */

const Routes = require("./routes/routes");
const express = require("express");

class AppController {
  constructor() {
    this.express = express();

    this.define();
  }

  define() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));

    this.express.use("/api/v1", new Routes().loadRoutes());
  }
}

module.exports = new AppController().express;
