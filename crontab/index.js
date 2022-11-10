const { map, get } = require("lodash");
const cron = require("node-cron");
const { apiRequestAxios } = require("../config");
const constants = require("../config/constant");
const db = require("../models");
const Stock = db.stock;
const Stocksdata = db.stocksdata;
// const getStocksData =
//   "http://nimblerest.lisuns.com:4531/GetLastQuoteArray/?accessKey=5d7af65c-2622-462a-a7de-ad765a618e48&exchange=NSE&isShortIdentifiers=true";
const getStocksData = constants.stockDetailsAPI;
const importStockData = cron.schedule(
  "*/5 3-12 * * 1-5",
  // "1 * * * *",
  async () => {
    try {
      let StockList = await Stock.find();
      let concatinatedStockNames = map(StockList, "NAME").join("+");
      let getStock = await apiRequestAxios(
        getStocksData + "&instrumentIdentifiers=" + concatinatedStockNames
      );
      let responseData = [];
      if (get(getStock, "data", []).length) {
        responseData = get(getStock, "data", []);

        for (let item of responseData) {
          let StocksData =  new Stocksdata(item);
          let insertedRes = await StocksData.save(item);
          console.log("insertedRes : ", insertedRes);
        }
      }
    } catch (error) {
      console.log("ERRRR : ", error);
    }
  },
  {
    scheduled: false,
  }
);

module.exports = { importStockData };
