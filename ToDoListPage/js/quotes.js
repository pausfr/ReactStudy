const quotes = [
  {
    quote: "새해 복 많이 받으세요!",
    author: "",
  },
  {
    quote: "올 한 해도 화이팅!",
    author: "",
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;
