/*================================
All refrence are here 
=================================*/
const inputBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

// Error msg references
const emptyErr = document.querySelector(".empty-input-error");
const userError = document.querySelector(".user-error");
// All books stored div
const allBooks = document.querySelector(".main-books");
// Total books found
const totalBooks = document.querySelector(".total-count");
// Loading spinner
const loader = document.querySelector(".loader");
const total = document.querySelector(".total");
console.log(total);
// fetch all data functions
let fetchData = async (url) => {
  let res = await fetch(url);
  let data = await res.json();
  return data;
};

// Main functions starts here
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  allBooks.textContent = "";
  let inputValue = inputBox.value.trim().toLowerCase();
  //   clear
  inputBox.value = "";
  userError.textContent = "";
  emptyErr.classList.add("d-none");

  if (inputValue.length > 0) {
    findBooksData(inputValue);
    loader.classList.remove("d-none");
    totalBooks.classList.add("d-none");
  } else {
    emptyErr.classList.remove("d-none");
  }
});

// Books data function

let findBooksData = (inputText) => {
  fetchData(`https://openlibrary.org/search.json?q=${inputText}`).then(
    (data) => {
      booksData(data, inputText);
    }
  );
};

// All books data by with all information

let booksData = (data, inputText) => {
  let myBooks = data.docs.splice(0, 30);
  // User Input Error here

  if (data.numFound === 0) {
    console.log("Nothing");
    let typeError = document.createElement("div");
    typeError.className =
      "error-div m-auto animate__bounceInLeft animate__animated";
    typeError.innerHTML = ` <img
    src="img/undraw_page_not_found_su7k.png"
    class="m-auto"
    width="400"
  />
  <h3 class="text-center text-warning">No Book found by --${inputText}</h3>`;

    userError.appendChild(typeError);
    loader.classList.add("d-none");
  }
  // Main data function starts here

  let bookall = 1;

  myBooks.forEach((book) => {
    //   Checking author name

    if (book.author_name === undefined) {
      return;
    } else {
      let col = document.createElement("div");
      col.className = "col-12 col-md-4 col-lg-4";
      col.innerHTML = `
      <div class="card shadow" style="width: 100%; height: 100%;">
      <img src="https://covers.openlibrary.org/b/id/${
        book.cover_i
      }-L.jpg" style="width: 19rem;margin: auto; height: 21rem; margin-top: 2rem;
      margin-bottom: 2rem;" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title m-0 fs-4 mb-2">${book.title}</h5>
        <p class="card-text m-0 text-primary">Author Name : ${
          book.author_name[0]
        }</p>
        <p class="card-text m-0 text-muted">First publish year: ${
          book.first_publish_year
        }</p>
        <p class="card-text m-0 text-muted">First publisher: ${
          book.publisher === undefined ? "No publisher" : book.publisher[0]
        }</p>
        
      </div>
    </div>
    `;
      allBooks.appendChild(col);

      let booksTotal = bookall++;
      total.innerHTML = booksTotal;
      totalBooks.classList.remove("d-none");
    }
    loader.classList.add("d-none");
  });
};
console.log(totalBooks);
