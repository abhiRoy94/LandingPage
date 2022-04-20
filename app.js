// External Packages
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const schedule = require('node-schedule');

// Internal Packages
const date = require(__dirname + "/apis/date.js");
const weather = require(__dirname + "/apis/weather.js");
const quote = require(__dirname + "/apis/quotes.js");
const news = require(__dirname + "/apis/news.js");

const app = express();

// Using features with Express
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Global API variables
let myWeather = {
  myPlace: "",
  myTemp: "",
  myStatus: "",
  myImage: ""
}
let myQuoteData = {
  myQuote: "",
  myAuther: ""
};

app.get("/", function(req, res) {

  // Get current day and set it in the ejs file
  let myDay = date.getDate();

  // Get default quote of the Day and run cron job to get a new quote every 24 hrs
  let newQuote = quote.getQuoteOfTheDay();
  myQuoteData.myQuote = newQuote.quoteText;
  myQuoteData.myAuthor = newQuote.quoteAuthor;

  var job = schedule.scheduleJob('0 0 * * *', function() {
    newQuote = quote.getQuoteOfTheDay();
    myQuoteData.myQuote = newQuote.quoteText;
    myQuoteData.myAuthor = newQuote.quoteAuthor;
  });

  // Set object
  const renderObject = {
    currentDay: myDay,
    weatherData: myWeather,
    quoteOfTheDay: myQuoteData
  }

  res.render('main', renderObject);
});

app.post("/", async function(req, res) {

  console.log(req.body);

  // Wait for weather API to come back with data and update weather object
  if (req.body.cityName != "") {
    let weatherObj = await weather.getWeather(req);
    myWeather.myPlace = weatherObj.weatherPlace[0].toUpperCase() + weatherObj.weatherPlace.slice(1);
    myWeather.myTemp = weatherObj.weatherTemp;
    myWeather.myStatus = weatherObj.weatherStatus;
    myWeather.myImage = weatherObj.weatherImage;
  }

  res.redirect("/");
})


app.post("/news", async function(req, res) {

  //console.log(req.body.newsQuery);

  let newsObjects = await news.getNews(req, req.body.newsQuery);
  console.log(newsObjects);

  res.render('news', {articles: newsObjects});
})

app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
