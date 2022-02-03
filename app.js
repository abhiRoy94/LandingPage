// External Packages
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

// Internal Packages
const date = require(__dirname + "/apis/date.js");
const weather = require(__dirname + "/apis/weather.js");

const app = express();

// Using features with Express
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Global API variables
let myWeather = {
  myPlace: "",
  myTemp: "",
  myStatus: "",
  myImage: ""
}

app.get("/", function(req, res) {

  // Get current day and set it in the ejs file
  let myDay = date.getDate();

  // Set object
  const renderObject = {
    currentDay: myDay,
    weatherPlace: myWeather.myPlace,
    weatherTemp: myWeather.myTemp,
    weatherTempStatus: myWeather.myStatus,
    weatherImage: myWeather.myImage
  }

  res.render('main', renderObject);
});

app.post("/", async function(req, res) {

  // Wait for weather API to come back with data and update weather object
  let weatherObj = await weather.getWeather(req);
  myWeather.myPlace = weatherObj.weatherPlace[0].toUpperCase() + weatherObj.weatherPlace.slice(1);
  myWeather.myTemp = weatherObj.weatherTemp;
  myWeather.myStatus = weatherObj.weatherStatus;
  myWeather.myImage = weatherObj.weatherImage;


  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
