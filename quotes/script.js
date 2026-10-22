async function fetchQuote() {
    try {
        // Используем DummyJSON 
        const response = await fetch('https://dummyjson.com/quotes/random');

        if (!response.ok) {
            throw new Error(`HTTP ошибка: ${response.status}`);
        }

        const data = await response.json();
        // DummyJSON возвращает объект с полями quote и author
        console.log(`"${data.quote}" — ${data.author}`);

        // Пример отображения на странице:
        // const quoteElement = document.getElementById('quote-text');
        // quoteElement.textContent = `"${data.quote}" — ${data.author}`;

    } catch (error) {
        console.error('Не удалось получить цитату:', error);
    }
}

fetchQuote();