// Глобальная переменная, куда мы сохраним список
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitter = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new_quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Добавлено слово async!
async function newQuote() {
    if (apiQuotes.length === 0) return;

    loading();

    // Ждем полсекунды
    await new Promise(resolve => setTimeout(resolve, 500));

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.quote.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.quote;

    complete();
}

async function getQuote() {
    // 1. Показываем лоадер ПЕРЕД началом загрузки
    loading();
    await new Promise(resolve => setTimeout(resolve, 2000));
    try {
        const response = await fetch('https://dummyjson.com/quotes');

        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const data = await response.json();
        apiQuotes = data.quotes;

        // 2. Показываем первую цитату
        newQuote();

        // 3. Прячем лоадер и показываем цитату
        complete();

    } catch (error) {
        console.error('Не удалось получить цитату:', error);
        // На всякий случай, если интернет упал, прячем лоадер, 
        // чтобы страница не висела пустой навсегда
        complete();
    }
}

// Вешаем слушатель на кнопку
newQuoteBtn.addEventListener("click", newQuote);

// 4. Запускаем загрузку при старте страницы
getQuote();