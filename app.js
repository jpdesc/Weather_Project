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
});
//  const query = "London";
//  const apiKey = "1126ea142dfe633b53a669936a917613";
//  const units = "imperial";
//  const url =
//    "https://api.openweathermap.org/data/3.0/onecall?" +
//    query +
//    "&appid=" +
//    url +
//    "&units=" +
//    units;
//  https.get(url, function (response) {
//    console.log(response.statusCode);
//    response.on("data", function (data) {
//      const weatherData = JSON.parse(data);
//      const temp = weatherData.current.temp;
//      const description = weatherData.current.weather[0].description;
//      const icon = weatherData.weather[0].icon;
//      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//      res.write(
//        "<h1>The temperature in London is " + temp + "degrees Celsius.</h1>"
//      );
//      res.write("<p>The weather is currently " + weatherDescription + "</p>");
//      res.write("<img src=" + imageUrl + ">");
//      res.send();
//    });
//  });
//  res.send("Server is running");

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});
