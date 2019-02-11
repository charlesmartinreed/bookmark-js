 // Welcome to ES6 classes

 // Book class
 class Book {
	 // constructor = init
	 constructor(title, author, isbn) {
		 this.title = title;
		 this.author = author;
		 this.isbn = isbn;
	 }
 }

 // UI Class - handle UI Tasks
class UI {
	//static to make these class methods, rather than instancce
	static displayBooks() {
		const StoredBooks = [
			{
				title: 'Book One',
				author: 'John Doe',
				isbn: '3434434'
			},
			{
				title: 'Book Two',
				author: 'Jane Doe',
				isbn: '45545'
			}
		];

		const books = StoredBooks;

		// loop through books in StoredBooks, call addBooks
		books.forEach((book) => UI.addBookToList(book));
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');

		// create the row to put into our html table
		row.innerHTML = `
			<td>${book.title}</td>
			<td>${book.author}</td>
			<td>${book.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
		`;

		//append the row to the book-list
		list.appendChild(row);
	}

	static clearFields() {
		document.querySelector('#title').value = '';
		document.querySelector('#author').value = '';
		document.querySelector('#isbn').value = '';
	}
}

 // Store Class - Handles storage, locally

 // Event - Display Booklist
 // as soon as the DOM is loaded
 document.addEventListener('DOMContentLoaded', UI.displayBooks);

 // Event - Add a book
 // grab the form, listen for the submit
 document.querySelector('#book-form').addEventListener('submit', (e) => {
	 //prevent actual submit from occurring
	 e.preventDefault();

	 // get the form values
	 const title = document.querySelector('#title').value;
	 const author = document.querySelector('#author').value;
	 const isbn = document.querySelector('#isbn').value;

	 //make a Book
	 const book = new Book(title, author, isbn);

	 //reflect new book in UI
	 UI.addBookToList(book)

	 //clear the submit fields
	 UI.clearFields();
 });

  // Event - Remove a  book
