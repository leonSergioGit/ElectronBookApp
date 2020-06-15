import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AddBook from './AddBook';
import { ipcRenderer } from 'electron';
import BookItem from './BookItem';

const App = () => {


	//Last book added doesn't get saved. Solve
	const [books, setBooks] = useState([]);

	const addBook = (book) => {
		setBooks([...books, book]);
		ipcRenderer.send('books:add', books);
	}

	useEffect(() => {
		ipcRenderer.send('books:load');
		ipcRenderer.on('books:get', (e, fileBooks) => {
			setBooks(JSON.parse(fileBooks));
			console.log(fileBooks)
		})
	}, [])

	return (
		<Container className='app'>
			<AddBook addBook={addBook}/>
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Author</th>
						<th>Language</th>
						<th>Finished</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ books.map((book, index) => {
						return <BookItem  key={index} book={book} />
					}) }
				</tbody>
			</Table>
		</Container>
	)
}

export default App
