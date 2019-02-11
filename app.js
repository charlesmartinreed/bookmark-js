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

	static deleteBook(el) {
		//if the class is "delete"
		if(el.classList.contains('delete')) {
			//remove the parent of the parent, which would encompass the entire row
			el.parentElement.parentElement.remove();
		}
	}

	static showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert alert-${className}`;
		div.appendChild(document.createTextNode(message));

		const container = document.querySelector('.container');
		const form = document.querySelector('#book-form');
		container.insertBefore(div, form); //insert the div before the form, in the parent container, container

		//make alert delete in 2 seconds by removing anything the alert class
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 1500);

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

	 // Ensure that none of the fields are blank
	 if (title === '' || author === '' || isbn === '') {
		 // className is actually alert-danger in bootstrap, but we're using string interpolation so we only need to pass in the 'danger' or 'success'
		 UI.showAlert('Please fill in all fields', 'danger')
	 } else {
			 //make a Book
			 const book = new Book(title, author, isbn);

			 //reflect new book in UI
			 UI.addBookToList(book)

			 UI.showAlert('Book was added to collection!', 'success');

			 //clear the submit fields
			 UI.clearFields();
	 }


 });

  // Event - Remove a  book
	// Uses "event propgation" to target things clicked insdie of the book list
	// Targeting just the delete class would only remove the first such element in the DOM rather than the one we actually clicked on.
	document.querySelector('#book-list').addEventListener('click', (e) => {
		//we'll pass the target on the event to a UI method
		UI.deleteBook(e.target);

		UI.showAlert('Book was removed from collection!', 'danger');

	})
