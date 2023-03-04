

if (localStorage.getItem("history") != null) {
    window.location.href = "./new1.html";
  }
  
  
  const btnEl = document.getElementById("btn");
  const bookContainerEl = document.querySelector(".book-container");
  
  
  let bookHistory = [];
  
  btnEl.addEventListener("click", getBookData);
  


  async function getBookData(e) {
    e.preventDefault();
    bookContainerEl.innerHTML = "";
    const inputElVal = document.getElementsByTagName("input")[0].value;
  
    

    if (inputElVal.length === 0) {
      alert("Please Search Something ");
      return;
    }
  
    
    let date = new Date();
    let AMPM = date.getHours() < 12 ? " AM" : " PM";
    let time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + AMPM;
    let curDate =
      date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    let dateAndTime = curDate + " " + time;
  
    
    let bHistory = {
      search: inputElVal,
      date: dateAndTime,
    };
  
    
    if (localStorage.getItem("history") === null) {
      bookHistory.push(bHistory);
      localStorage.setItem("history", JSON.stringify(bookHistory));
    } else {
      bookHistory = [];
      let a = JSON.parse(localStorage.getItem("history"));
      bookHistory.push(...a, bHistory);
      localStorage.setItem("history", JSON.stringify(bookHistory));
    }

    document.getElementById("data").innerText = `Book Result for: ${inputElVal}`;
  
    
    let URL = `https://www.googleapis.com/books/v1/volumes?q=` + inputElVal;
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