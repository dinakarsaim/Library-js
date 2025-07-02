const myLibrary = [];

function Book (title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary (title, author, pages, read){
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleReadStatus (id) {
    const book = myLibrary.find(book => book.id === id);
    if (book){
        book.toggleRead();
        displayBooks();
    }
}

function displayBooks () {
    const container = document.getElementById('bookContainer');
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', book.id);

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Unread'}</p>
            <button class="removeBtn">Remove</button>
            <button class="toggleBtn">Toggle Read</button>
        `;
        container.appendChild(card);
            card.querySelector('.removeBtn').addEventListener('click', () => {
        removeBook(book.id);
        });

        card.querySelector('.toggleBtn').addEventListener('click', () => {
        toggleReadStatus(book.id);
        });
    });
}

const bookForm = document.getElementById('bookForm');
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  bookForm.reset();
  document.getElementById('bookDialog').close();
});

document.getElementById('newBookBtn').addEventListener('click', () => {
  document.getElementById('bookDialog').showModal();
});

addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);


