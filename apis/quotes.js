const Quote = require('inspirational-quotes');

// Global Object
let myQuote = {
  quoteText: "",
  quoteAuthor: ""
};

exports.getQuoteOfTheDay = function getQuoteOfTheDay() {

  let quoteResp = Quote.getQuote();
  myQuote.quoteText = quoteResp.text;
  myQuote.quoteAuthor = quoteResp.author;

  return myQuote;
}
