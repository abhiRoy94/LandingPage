const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();

// Using features with Express
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Global API variables
let weatherPlace = "";
let weatherTemp = "";
let weatherStatus = "";
let weatherImage = "";

function getDay() {
  // Set the current Day options
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  let day = today.toLocaleDateString("en-US", options);
  return day;
}

function getWeather(req, res) {
  weatherPlace = req.body.cityName;
  const apiKey = "e3e25755205bb9b1d963a9ad4366cb91";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherPlace + "&appid=" + apiKey + "&units=" + units + "";

  // Get the response
  https.get(url, function(response) {

    response.on('data', function(data) {

      weatherData = JSON.parse(data);
      weatherTemp = weatherData.main.temp;
      weatherStatus = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      weatherImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    });
  });

}

app.get("/", function(req, res) {

  // Get current day and set it in the ejs file
  let myDay = getDay();

  // Set object
  const renderObject = {
    currentDay: myDay,
    weatherPlace: weatherPlace,
    weatherTemp: weatherTemp,
    weatherTempStatus: weatherStatus,
    weatherImage: weatherImage
  }

  console.log("Temp: " + weatherTemp + ", status: " + weatherStatus);
  res.render('main', renderObject);
});

app.post("/", function(req, res) {
  
  getWeather(req, res);
  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
