const newsBtn = document.getElementById("news");
const booksBtn = document.getElementById("book");
const storiesBtn = document.getElementById("stories");

const apiUrl = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM';
const url = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM`;
const surl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM`;

document.addEventListener('DOMContentLoaded', () => {
    const booksDiv = document.getElementById('books')
    booksDiv.innerHTML ='' ;

    
    fetchBooks(apiUrl);

    
    booksBtn.addEventListener("click", () => fetchBooks(apiUrl));
    newsBtn.addEventListener("click", () => fetchArticles(url));
    storiesBtn.addEventListener("click", () => fetchArticles(surl));

    function fetchBooks(apiEndpoint) {
        
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) throw new Error('Error fetching data');
                return response.json();
            })
            .then(data => {
                
                const books = data.results.books;
                booksDiv.innerHTML = books.map(book => `
                    <div class="book-container">
                        <a href="${book.amazon_product_url}" target="_blank"><img src="${book.book_image}" alt="Cover of ${book.title}" class="book-cover" /></a>
                        <div class="book-details">
                            <a target="_blank" class="book-title"><h2>${book.title}</h2></a>
                            <h3>by ${book.author}</h3>
                            <p>Rank: ${book.rank}</p>
                            <p>${book.description}</p>
                            <p class="buy-button"><a href="${book.amazon_product_url}" target="_blank">Buy on Amazon</a></p>
                        </div>
                    </div>
                `).join('');
            })
            .catch(error => {
                console.error('Error fetching books:', error);
                booksDiv.textContent = 'Failed to load books.';
            });
    }

    function fetchArticles(apiEndpoint) {
        fetch(apiEndpoint)
            .then(response => {
                if (!response.ok) throw new Error('Error fetching data');
                return response.json();
            })
            .then(data => {
                const articles = data.results;
                const articlesContainer = document.getElementById('articles');
                articlesContainer.innerHTML = '';

                articles.forEach(article => {
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article-container');

                    const img = document.createElement('img');
                    img.src = article.multimedia?.[0]?.url || '';
                    img.alt = article.multimedia?.[0]?.caption || 'Image not available';
                    img.classList.add('article-image');

                    const articleDetails = document.createElement('div');
                    articleDetails.classList.add('article-details');

                    const title = document.createElement('h2');
                    const link = document.createElement('a');
                    link.href = article.url;
                    link.target = '_blank';
                    link.classList.add('article-title');
                    link.innerText = article.title;

                    const abstract = document.createElement('p');
                    abstract.innerText = article.abstract;

                    title.appendChild(link);
                    articleDetails.appendChild(title);
                    articleDetails.appendChild(abstract);

                    articleDiv.appendChild(img);
                    articleDiv.appendChild(articleDetails);
                    articlesContainer.appendChild(articleDiv);
                });
            })
            .catch(error => console.error('Error fetching the articles:', error));
    }
});
