/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-27 20:47:15
 * @modify date 2019-12-27 20:47:15
 * @desc Define app routes.
 */

const express = require("express");

const ConversionController = require("../app/controllers/ConversionController");

class Routes {
  constructor() {
    this.router = express.Router();

    this.definePublicRoutes();
  }

  definePublicRoutes() {
    this.router.get("/conversion", ConversionController.conversion.bind(this));
  }

  loadRoutes() {
    return this.router;
  }
}

module.exports = Routes;
