const PORT = 4000; // Use the correct port

function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const genre = document.getElementById('genre').value;

  fetch(`http://localhost:${PORT}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, genre }),
  })
    .then(response => response.json())
    .then(savedBook => {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('genre').value = '';

      fetchBooks();
    })
    .catch(error => console.error('Error adding book:', error));
}

function fetchBooks() {
  fetch(`http://localhost:${PORT}/books`)
    .then(response => response.json())
    .then(books => {
      const booksList = document.getElementById('books');
      booksList.innerHTML = '';

      books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `<span>Title:</span>${book.title} | <span>Author:</span>${book.author} | <span>Genre:</span>${book.genre} | <button onclick="editBook('${book._id}')">Edit</button> | <button onclick="deleteBook('${book._id}')">Delete</button>`;
        booksList.appendChild(li);
      });
    })
    .catch(error => console.error('Error fetching books:', error));
}

function editBook(id) {
  const title = prompt("Enter new title:");
  const author = prompt("Enter new author:");
  const genre = prompt("Enter new genre:");

  fetch(`http://localhost:${PORT}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, genre }),
  })
    .then(response => response.json())
    .then(updatedBook => {
      console.log(`Book with ID ${id} updated`);
      fetchBooks();
    })
    .catch(error => console.error(`Error updating book with ID ${id}:`, error));
}

function deleteBook(id) {
  fetch(`http://localhost:${PORT}/books/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(deletedBook => {
      console.log(`Book with ID ${id} deleted`);
      fetchBooks();
    })
    .catch(error => console.error(`Error deleting book with ID ${id}:`, error));
}

// Initial fetchBooks call
fetchBooks();
