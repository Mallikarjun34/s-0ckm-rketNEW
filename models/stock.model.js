module.exports = mongoose => {
  const Stock = mongoose.model(
    "stock",
    mongoose.Schema(
      {
        EXCHANGE: String,
        EXPIRY: String,
        IDENTIFIER: String,
        INDEXNAME: String,
        NAME: String,
        OPTIONTYPE: String,
        PRICEQUOTATIONUNIT: String,
        PRODUCT: String,
        PRODUCTMONTH: String,
        STRIKEPRICE: String,
        TRADESYMBOL: String,
        UNDERLYINGASSET: String,
        UNDERLYINGASSETEXPIRY: String,
        QUOTATIONLOT: String,
        DESCRIPTION: String,
        CREATEDAT: {
          type: Date,
          default: new Date()
        }
      },
      { timestamps: true }
    )
  );

  return Stock;
};