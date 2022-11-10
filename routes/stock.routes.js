module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  router.get("/getStockDetails", tutorials.findStockDetails);
  router.get("/getGraphData", tutorials.getGraphData);

  app.use('/api', router);
};