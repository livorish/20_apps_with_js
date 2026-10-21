// Get quotes From API
let apiQuotes = [];

async function getQuotes() {
    const apiURL = 'https://zenquotes.io/api/random';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        console.log(apiQuotes)
    } catch (error) {

    }
}
getQuotes()