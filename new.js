let bookID = localStorage.getItem("book");

        let books = JSON.parse(localStorage.getItem("history"));

        let curBook = books[bookID];

        const bookEl = document.querySelector(".top");

        bookEl.innerHTML = `
              <p>${+bookID + 1}. ${curBook.search}</p>
              <p>Searched On: ${curBook.date}</p>
              `;
        const bookContainerEl = document.querySelector(".book-container");

        let URL =
          `https://www.googleapis.com/books/v1/volumes?q=` + curBook.search;

        async function getBook() {

          const res = await fetch(URL);
          const data = await res.json();
          const books = data.items;

          books.forEach((book) => {
            bookContainerEl.innerHTML += `
              <div class="book">

                  <img src="${book.volumeInfo.imageLinks?.thumbnail}" alt="" width: "100%"/>

                  <p><b>Title: </b> ${book.volumeInfo?.title}</p>

                  <p><b>Author:</b> ${book.volumeInfo?.authors}</p>


                  <p><b>Page Count:</b> ${book.volumeInfo?.pageCount}</p>

                  <p><b>Publisher:</b> ${book.volumeInfo?.publisher}</p>
                  <button id = "buy">Buy Now</button>
                </div>
            `;
          });
        }


        getBook();