// Constructor for book objects
// Refactor constructor to class
class Book {
    constructor (title,author,pages,read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read? "Read":"Not read yet";
        this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;         
        }
    }
    //Since class methods are installed to the prototype property of the class
    //the toogleRead function is now moved inside the Book class
    toggleRead () {
        this.read = this.read === "Read"? "Not read yet":"Read";
    }
}

// const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", 295, false);
// theHobbit.info(); // "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
// console.log(theHobbit.info());

const myLibrary = [];

function addBookToLibrary(title,author,pages,read) {
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
}

const library = document.querySelector('.library');

function displayBook() {
    while (library.hasChildNodes()) {
        library.removeChild(library.firstChild);
    }
    
    for (let i = 0; i < myLibrary.length; i++) {
        const card = document.createElement("div");
        card.setAttribute("id",`card${i}`);
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
        const readStatus = document.createElement("button");
        readStatus.setAttribute("class", "readStatus");
        readStatus.textContent = book.read === "Read"?'Mark as Unread':"Mark as Read";
        card.appendChild(readStatus);

        const removeBtn = document.createElement("button");
        removeBtn.setAttribute("class", "removeBtn");
        removeBtn.setAttribute("id",`${i}`);
        removeBtn.textContent = "Remove";
        card.appendChild(removeBtn);
    }
}

//remove book of index of the id attribute
library.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "removeBtn") {
        myLibrary.splice(target.id,1);
        displayBook();
    }
})

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
    const pages = inputWindow.querySelector("#pages").value !== "NaN"?inputWindow.querySelector("#pages").value:" ";
    const read = inputWindow.querySelector("#read").value === "yes"?true:false;

    addBookToLibrary(title, author, pages, read);
    displayBook();
    inputWindow.close();
})

inputWindow.addEventListener("close", () => {
    form.reset();
})

library.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "readStatus") {
        const bookIndex = target.nextSibling.id;
        myLibrary[bookIndex].toggleRead();
        displayBook();
    }
})