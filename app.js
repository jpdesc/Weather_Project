const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "1126ea142dfe633b53a669936a917613";
  const geocodingURL =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    query +
    "&limit=5&appid=" +
    apiKey;

  let lattitude = "";
  let longitude = "";

  https.get(geocodingURL, function (response) {
    response.on("data", function (data) {
      const queryData = JSON.parse(data);
      lattitude = queryData[0].lat;
      console.log(lattitude);
      longitude = queryData[0].lon;
    });
  });
  console.log("Lattitude = " + lattitude);

  const units = "imperial";
  const onecallUrl =
    "https://api.openweathermap.org/data/3.0/onecall?lat=" +
    lattitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=" +
    units;
  https.get(onecallUrl, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.current.temp;
      const description = weatherData.current.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in" +
          query +
          " is " +
          temp +
          "degrees Celsius.</h1>"
      );
      res.write("<p>The weather is currently " + description + "</p>");
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
  res.send("Server is running");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
