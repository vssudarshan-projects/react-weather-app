const MongoClient = require("mongodb").MongoClient;

const user = process.env.mongoDB.USER;
const key = process.env.mongoDB.KEY;
const cluster = process.env.mongoDB.CLUSTER;
const database = process.env.mongoDB.DATABASE;
const queryList = process.env.mongoDB.QUERYLIST;

const uri =
  "mongodb+srv://" + user + ":" + key + cluster + database + queryList;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.connectDB = async function () {
  return new Promise((resolve, reject) => {
    if (!client.isConnected()) {
      client
        .connect()
        .then(() => {
          console.log("MONGODB CONNECTED");
          resolve("ok");
        })
        .catch((err) => {
          console.log("MONGODB CONNECTION ERROR =>", err);
          client.close();
          reject(err);
        });
    } else {
      console.log("MONGODB ALREADY CONNECTED");
      resolve("ok");
    }
  });
};

module.exports.insertDocument = function (document) {
  const collection = client.db("react-api").collection("weatherData");
  collection.findOneAndReplace(
    { city: document.city, country: document.country },
    document,
    { upsert: true }
  );
};

module.exports.getDocuments = async function (city, paginationInfo) {
  const docArray = [];
  try {
    const collection = client.db("react-api").collection("weatherData");
    const docCursor = await collection.find({
      city: { $regex: city, $options: "i" },
    });

    paginationInfo.totalCount = await docCursor.count();
    docCursor.skip(paginationInfo.page * paginationInfo.pageSize);
    docCursor.limit(paginationInfo.pageSize);

    await docCursor.forEach((doc) => docArray.push(doc));
  } catch (err) {
    console.log("DOCUMENT INSERT ERROR =>", err);
  }
  return {
    documents: docArray,
    paginationInfo: { ...paginationInfo },
  };
};

module.exports.deleteDocument = async function (key) {
  try {
    const collection = client.db("react-api").collection("weatherData");
    collection.findOneAndDelete({
      city: key.city,
      country: key.country,
    });
  } catch (err) {
    console.log("DOCUMENT DELETE ERROR =>", err);
  }
};
