module.exports = mongoose => {
  const StocksData = mongoose.model(
    "stocksData",
    mongoose.Schema(
      {
        AVERAGETRADEDPRICE: String,
        BUYPRICE: String,
        BUYQTY:String,
        CLOSE: String,
        EXCHANGE: String,
        HIGH: String,
        INSTRUMENTIDENTIFIER: String,
        LASTTRADEPRICE: String,
        LASTTRADEQTY:String,
        LASTTRADETIME:String,
        LOW: String,
        OPEN: String,
        OPENINTEREST:String,
        PREOPEN:String,
        QUOTATIONLOT: String,
        SELLPRICE: String,
        SELLQTY:String,
        SERVERTIME:String,
        TOTALQTYTRADED:String,
        VALUE: String,
        PRICECHANGE: String,
        PRICECHANGEPERCENTAGE: String,
        OPENINTERESTCHANGE: String,
        CREATEDAT: {
          type: Date,
          default: new Date()
        }
      },
      { timestamps: true }
    )
  );

  return StocksData;
};