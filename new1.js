
      const searchDetailsEl = document.querySelector(".search-details");

      
      let bookHistory = JSON.parse(localStorage.getItem("history"));


      bookHistory.forEach((ele, index) => {

        searchDetailsEl.innerHTML += `
             <div  onClick = "handleClick(${index})" class="search top-container">
             
          <p> ${index + 1}. ${ele.search}</p>
          <p>Searched On: ${ele.date}</p>
        </div>
        `;
      });

    
      function handleClick(id) {
        localStorage.setItem("book", id);
        window.location.href = "./new.html";
      }

      function clearHistory() {
        localStorage.clear();
        window.location.href = "./index.html";
      }