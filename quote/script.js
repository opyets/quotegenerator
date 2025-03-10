const quoteText = document.querySelector(".quote");
const authorText = document.querySelector(".name");
const newQuoteBtn = document.querySelector("#new-quote-btn");
const categoriesView = document.querySelector("#categories-view");
const quoteView = document.querySelector("#quote-view");
const categoryCards = document.querySelectorAll(".category-card");

let currentCategory = "inspirational";
let currentColor = "#ffffff";

function selectCategory(card, category) {
  categoryCards.forEach(c => c.classList.remove("active"));

  card.classList.add("active");

  currentCategory = category;
}

function showCategoriesView() {
  quoteView.classList.remove("active");
  categoriesView.classList.add("active");
  document.body.style.background = "white";
}

function showQuoteView() {
  categoriesView.classList.remove("active");
  quoteView.classList.add("active");
  
  changeBackgroundColor();
  getRandomQuote();
}

function getNewQuote() {
  getRandomQuote();
  changeBackgroundColor();
}

function adjustFontSize(quote) {
  quoteText.style.fontSize = "74px";
  
  if (quote.length > 100) {
    quoteText.style.fontSize = "68px";
  }
  if (quote.length > 150) {
    quoteText.style.fontSize = "56px";
  }
  if (quote.length > 200) {
    quoteText.style.fontSize = "42px";
  }
  if (quote.length > 250) {
    quoteText.style.fontSize = "32px";
  }
  
  if (quote.length > 300) {
    quoteText.style.fontSize = "28px";
  }
}

function getRandomQuote() {
  newQuoteBtn.disabled = true;
  newQuoteBtn.textContent = "Loading...";
  
  let apiUrl = "http://api.quotable.io/random";
  if (currentCategory) {
    apiUrl += `?tags=${currentCategory}`;
  }
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      quoteText.textContent = data.content;
      authorText.textContent = data.author;
      
      adjustFontSize(data.content);
      
      newQuoteBtn.disabled = false;
      newQuoteBtn.textContent = "New Quote";
    })
    .catch(error => {
      quoteText.textContent = "Failed to load quote. Please try again.";
      authorText.textContent = "";
      newQuoteBtn.disabled = false;
      newQuoteBtn.textContent = "Try Again";
    });
}

function changeBackgroundColor() {
  const red = Math.floor(Math.random() * 200);
  const green = Math.floor(Math.random() * 200);
  const blue = Math.floor(Math.random() * 200);
  
  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  document.body.style.background = backgroundColor;
}

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.95)';
  });
  
  button.addEventListener('mouseup', () => {
    button.style.transform = '';
  });
});