// Constructor for book objects
function Book (title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read? "Read":"Not read yet";
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;         
    } 
}

const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", 295, false);

theHobbit.info(); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"

console.log(theHobbit.info());


const myLibrary = [];


function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read);
    
    myLibrary.push(newBook);
}

//trial 
// addBookToLibrary("title1","author1",1,0);
// addBookToLibrary("title2","author2",2,1);
// addBookToLibrary("title3","author3",3,0);
// addBookToLibrary("title4","author4",4,1);
// addBookToLibrary("title5","author5",5,0);
// console.table(myLibrary);

const library = document.querySelector('.library');


function displayBook() {
    while (library.hasChildNodes()) {
    library.removeChild(library.firstChild);
    }
    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("id",`${i}`);
        card.setAttribute("class", "card");
        const book = myLibrary[i];
        library.appendChild(card);

        for (let j = 0; j < Object.keys(book).length; j++) {
            // IF object property does not have a value of function
            // THEN extract the info
            if (typeof Object.values(book)[j] !== "function") {
                const cardContent = document.createElement("p");

                const keyString = String(document.querySelectorAll("label")[j].textContent);
                const valueString = String(Object.values(book)[j]);
                const capKey = keyString.charAt(0).toUpperCase() + keyString.slice(1);
                const capValue = valueString.charAt(0).toUpperCase() + valueString.slice(1);

                const entry = document.createTextNode(`${capKey} ${capValue}`);
                cardContent.appendChild(entry);
                card.appendChild(cardContent);
            }
        }
    }
}

// displayBook();
//make reference to new book button and the dialog element
const newBook = document.getElementById("newBook");
const inputWindow = document.getElementById("addBook");
//make reference to dialog buttons
const cancelBtn = document.getElementById("cancel");
const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");

newBook.addEventListener("click",() => {
    inputWindow.showModal();  
})

cancelBtn.addEventListener("click", () => {
    inputWindow.close();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //make reference to input entries
    const title = inputWindow.querySelector("#title").value;
    const author = inputWindow.querySelector("#author").value;
    const pages = parseInt(inputWindow.querySelector("#pages").value);
    const read = inputWindow.querySelector("#read").value === "yes"?true:false;

    addBookToLibrary(title, author, pages, read);
    displayBook();
    inputWindow.close();
})

inputWindow.addEventListener("close", () => {
    form.reset();
})