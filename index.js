const SHELF = document.querySelector('#shelf tbody');
const addButton = document.querySelector('#addBook');
const BODY = document.querySelector('body');
const OVERLAY = document.querySelector('.overlay');
const CLOSE_OVERLAY = document.querySelector('#close');
const SUBMIT = document.querySelector('#submit');
const AUTHOR = document.querySelector('#newAuthor');
const TITLE = document.querySelector('#newTitle');
const PAGES = document.querySelector('#newPages');
const HAS_READ = document.querySelector('#newHasRead');

let myLibrary = [];

function Book(author, title, pages, hasRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
    this.hasDisplay = false;
}

Book.prototype.display = function () {
    if (!this.hasDisplay) {
        let newDisplay = document.createElement('tr');
        let newAuthor = document.createElement('td');
        let newTitle = document.createElement('td');
        let newPages = document.createElement('td');
        let newHasRead = document.createElement('td');
        let deleteCol = document.createElement('td');
        let deleteButton = document.createElement('button');
        let deleteIcon = document.createElement('i');
        let readCheckbox = document.createElement('input');

    
        newDisplay.classList.add('book');
        newAuthor.classList.add('author');
        newTitle.classList.add('title');
        newPages.classList.add('pages');
        newHasRead.classList.add('hasRead');
        deleteCol.classList.add('deleteCol');
        deleteButton.classList.add('deleteButton');
        deleteIcon.classList.add('material-icons');
        readCheckbox.classList.add('readCheckbox');

        newAuthor.textContent = this.author;
        newTitle.textContent = this.title;
        newPages.textContent = this.pages;
        deleteIcon.textContent = 'clear';
        readCheckbox.type = "checkbox";
        readCheckbox.checked = this.hasRead;
        
        readCheckbox.addEventListener('click', () => {
            this.hasRead = !this.hasRead;
        })

        deleteButton.addEventListener('click', () => {
            newDisplay.remove();
        });

        deleteButton.appendChild(deleteIcon);
        deleteCol.appendChild(deleteButton);
        
        newHasRead.appendChild(readCheckbox);

        newDisplay.appendChild(newAuthor);
        newDisplay.appendChild(newTitle);
        newDisplay.appendChild(newPages);
        newDisplay.appendChild(newHasRead);
        newDisplay.appendChild(deleteCol)

        SHELF.appendChild(newDisplay);

        this.hasDisplay = true;
    }
}


function addBookToLibrary(author, title, pages, hasRead) {
    let newBook = new Book(author, title, pages, hasRead);
    myLibrary.push(newBook);
}

function showBooksInLibrary() {
    for (let i in myLibrary) {
        myLibrary[i].display();
    }
}

addButton.addEventListener('click', () => { 
    OVERLAY.classList.add('overlayshow');
});

CLOSE_OVERLAY.addEventListener('click', () => {
    OVERLAY.classList.remove('overlayshow');
});

SUBMIT.addEventListener('click', () => {
    let author = AUTHOR.value;
    let title = TITLE.value;
    let pages = PAGES.value;
    let hasRead = HAS_READ.checked;

    addBookToLibrary(author, title, pages, hasRead);
    showBooksInLibrary();

    // Reset
    OVERLAY.classList.remove('overlayshow');
    AUTHOR.value = "";
    TITLE.value = "";
    PAGES.value = 0;
    HAS_READ.checked = false;
})