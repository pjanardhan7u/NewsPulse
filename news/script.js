const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const newsContainer = document.getElementById("newsContainer");

const globalApiKey = "37617593c076438597489bd271b222fc";
const globalApiUrl = "https://newsapi.org/v2/top-headlines";

// const globalApiKey = "4a8d08c2703e048ef736a6c1f72a72d1";
// const globalApiUrl = "https://gnews.io/api/v4/search";


function fetchNews(apiKey, apiUrl, searchQuery) {
    const url = `${apiUrl}?q=${searchQuery}&apiKey=${apiKey}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => displayNews(data.articles))
        .catch((error) => console.error("Error fetching news:", error));
}

// ... (existing code)

function displayNews(articles) {
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const title = document.createElement('h2');
        title.classList.add('news-title');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.classList.add('news-description');
        description.textContent = article.description;

        const source = document.createElement('p');
        source.classList.add('news-source');
        source.textContent = `Source: ${article.source.name}`;

        const date = document.createElement('p');
        date.classList.add('news-date');
        // Format the date in a user-friendly way (e.g., "July 20, 2023")
        const publishedDate = new Date(article.publishedAt);
        date.textContent = `Published on: ${publishedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

        const readMoreLink = document.createElement('a');
        readMoreLink.classList.add('read-more');
        readMoreLink.href = article.url;
        readMoreLink.target = '_blank';
        readMoreLink.textContent = 'Read More';

        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(source);
        newsCard.appendChild(date); // Add the date to the news card
        newsCard.appendChild(readMoreLink);

        newsContainer.appendChild(newsCard);
    });
}

// ... (existing code)


searchButton.addEventListener("click", () => {
    const searchQuery = searchInput.value.trim();

    if (searchQuery) {
        // Fetch global news
        fetchNews(globalApiKey, globalApiUrl, searchQuery);


    }
});
