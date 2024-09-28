const e=document.getElementById("news"),t=document.getElementById("book"),n=document.getElementById("stories"),o="https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM";document.addEventListener("DOMContentLoaded",()=>{let a=document.getElementById("books");function r(e){fetch(e).then(e=>{if(!e.ok)throw Error("Error fetching data");return e.json()}).then(e=>{let t=e.results.books;a.innerHTML=t.map(e=>`
                    <div class="book-container">
                        <a href="${e.amazon_product_url}" target="_blank"><img src="${e.book_image}" alt="Cover of ${e.title}" class="book-cover" /></a>
                        <div class="book-details">
                            <a target="_blank" class="book-title"><h2>${e.title}</h2></a>
                            <h3>by ${e.author}</h3>
                            <p>Rank: ${e.rank}</p>
                            <p>${e.description}</p>
                            <p class="buy-button"><a href="${e.amazon_product_url}" target="_blank">Buy on Amazon</a></p>
                        </div>
                    </div>
                `).join("")}).catch(e=>{console.error("Error fetching books:",e),a.textContent="Failed to load books."})}function i(e){fetch(e).then(e=>{if(!e.ok)throw Error("Error fetching data");return e.json()}).then(e=>{let t=e.results,n=document.getElementById("articles");n.innerHTML="",t.forEach(e=>{let t=document.createElement("div");t.classList.add("article-container");let o=document.createElement("img");o.src=e.multimedia?.[0]?.url||"",o.alt=e.multimedia?.[0]?.caption||"Image not available",o.classList.add("article-image");let a=document.createElement("div");a.classList.add("article-details");let r=document.createElement("h2"),i=document.createElement("a");i.href=e.url,i.target="_blank",i.classList.add("article-title"),i.innerText=e.title;let c=document.createElement("p");c.innerText=e.abstract,r.appendChild(i),a.appendChild(r),a.appendChild(c),t.appendChild(o),t.appendChild(a),n.appendChild(t)})}).catch(e=>console.error("Error fetching the articles:",e))}a.innerHTML="",r(o),t.addEventListener("click",()=>r(o)),e.addEventListener("click",()=>i("https://api.nytimes.com/svc/topstories/v2/world.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM")),n.addEventListener("click",()=>i("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=hiiqBQvopfJ1XvMLENHlX0grstEu1cJM"))});
//# sourceMappingURL=index.5e820835.js.map
