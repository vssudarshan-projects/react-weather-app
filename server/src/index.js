const express = require("express");
const db = require("./db");
const api = require("./api");

const app = express();

const PORT = process.env.PORT || 3002;

app.get("/api", async (req, res) => {
  const responseToClient = (result) => {
    const response = {
      weatherData: result.documents || [],
      paginationInfo: result.paginationInfo || {
        page: 0,
        pageSize: 0,
        totalCount: 0,
      },
    };

    console.log("RESPONSE", response);
    res.send(response);
  };

  console.log("client fetch request", req.query);

  db.connectDB()
    .then(() => {
      const cityName = req.query["city"].toLowerCase().trim();
      const paginationInfo = {
        page: Number(req.query["page"].trim()),
        pageSize: Number(req.query["pageSize"].trim()),
      };
      console.log("CITY", { cityName }, "PAGINATION", paginationInfo);

      db.getDocuments(cityName, paginationInfo).then((result) => {
        let callAPI = true;
        console.log("RESULTS", result);
        for (let document of result.documents)
          if (document.city.toLowerCase() === cityName) {
            callAPI = false;
            break;
          }
        if (cityName && callAPI) {
          api.getData(cityName, result, responseToClient);
        } else {
          responseToClient(result);
        }
      });
    })
    .catch((err) => {
      responseToClient();
    });
});

app.get("/save", (req, res) => {
  let weatherData = req.query["weatherData"];

  if (weatherData) {
    let document = JSON.parse(weatherData);
    console.log("client save request", req.query);
    db.insertDocument(document);
  }
  res.send();
});

app.get("/delete", (req, res) => {
  let cityData = req.query["q"];
  if (cityData) {
    key = JSON.parse(cityData);
    console.log("client delete request", req.query);
    db.deleteDocument(key);
  }
  res.send();
});

app.listen(PORT, () => {
  console.log("Listening on Port " + PORT);
});
