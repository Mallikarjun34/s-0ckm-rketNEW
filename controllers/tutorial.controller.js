const _ = require("lodash");
const moment = require("moment");
const db = require("../models");
const Tutorial = db.tutorials;
const STOCKSDATA = db.stocksdata;

// Retrieve all Tutorials from the database.
exports.findStockDetails = async (req, res) => {


  const stockName = req.query.stockName;
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};


  // let result = await STOCKSDATA.find().sort({"createdAt": -1}).limit(1);
  // return res.send({
  //   success: true,
  //   msg: 'Invalid Username or Password, Please Try Again.',
  //   data: result
  // });

  await STOCKSDATA.find({INSTRUMENTIDENTIFIER: stockName})
  // .select("_id BUYPRICE AVERAGETRADEDPRICE")
  .sort({"createdAt": -1}).limit(1)
    .then(data => {
      console.log("data : ", data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getGraphData = async (req, res) => {
  const stockName = req.query.stockName;
  const fromDate = req.query.fromDate;
  const endDate = req.query.endDate;
  console.log("fromDate : ", fromDate, endDate, stockName);
  await STOCKSDATA.find({INSTRUMENTIDENTIFIER: stockName,
    SERVERTIME:{
      $gte: fromDate,
      $lte: endDate
    }
  })
  // .select("BUYPRICE SERVERTIME")
  // .sort({"createdAt": -1}).limit(1)
    .then(data => {
      let result = []
      let values = [];
      data = _.filter(data, item=> Number(item.BUYPRICE) != 0)

      for(let item of data){
        result.push([Number(item.SERVERTIME), Number(item.BUYPRICE)]);
        values.push(Number(item.BUYPRICE))
      }
      res.send({min: _.min(values),max:_.max(values), leng:result, data});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
