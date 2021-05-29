const http = require("http");

const api_key = process.env.WEATHER_API_KEY;

exports.getData = async function (cityName, result, responseToClient) {
  http
    .get(
      "http://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        api_key,
      (res) => {
        let data = [];
        res
          .on("data", (chunk) => {
            data.push(chunk);
          })
          .on("error", (err) => {
            console.log(err);
            responseToClient(result);
          });
        res
          .on("end", () => {
            if (res.complete) {
              const jsonData = JSON.parse(data.join(""));
              if (jsonData && jsonData.cod === 200) {
                result.documents.push({
                  city: jsonData.name,
                  country: jsonData.sys.country,
                  weather: jsonData.weather[0].main,
                  temperature: jsonData.main.feels_like,
                  pressure: jsonData.main.pressure,
                  humidity: jsonData.main.humidity,
                  windSpeed: jsonData.wind.speed,
                  visibility: jsonData.visibility,
                  isNewData: true,
                });
                result.paginationInfo.totalCount += 1;
              }
            }
            responseToClient(result);
          })
          .on("error", (err) => {
            console.log(err);
            responseToClient(result);
          });
      }
    )
    .on("error", (err) => {
      console.log(err);
      responseToClient(result);
    });
};
