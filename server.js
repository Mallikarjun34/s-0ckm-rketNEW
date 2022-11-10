const express = require("express");
const cors = require("cors");
const { importStockData } = require('./crontab');
var MongoClient = require('mongodb').MongoClient

const app = express();
const db = require("./models");
db.mongoose
  .connect(db.url, {
    // tlsCAFile: `rds-combined-ca-bundle.pem`,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// var client = MongoClient.connect(
//   'mongodb://sherbazaar:Sherbazaar@docdb-2022-11-08-05-07-52.cluster-c7xbg0feiszs.ap-south-1.docdb.amazonaws.com:27017/shere_bazar',
//   {
//     ssl: true,
//     sslValidate: true,
//     sslCA: `${__dirname}/rds-combined-ca-bundle.pem` //Specify the DocDB; cert
//   },
//   function(err, client) {
//     console.log("SSSS : ", err, client)
//       if(err)
//           throw err;
  
//           console.log("SSSS : ", client)
//       //Specify the database to be used
//       db = client.db('shere_bazar');
  
//       //Specify the collection to be used
//       col = db.collection('sample-collection');
  
//       //Insert a single document
//       col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
//         //Find the document that was previously written
//         col.findOne({'hello':'DocDB;'}, function(err, result){
//           //Print the result to the screen
//           console.log(result);
  
//           //Close the connection
//           client.close()
//         });
//      });
//   });
        

var corsOptions = {
  origin: "*"
};

importStockData.start();


app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8083;
require("./routes/tutorial.routes")(app);
require("./routes/stock.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});