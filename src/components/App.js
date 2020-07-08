import React, { useState, useEffect } from 'react';
import { HashRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import AddBook from './AddBook';
import { ipcRenderer } from 'electron';
import BookItem from './BookItem';
import NavBar from './NavBar';
import About from './About';
import Info from './Info';


const App = () => {


	//NEXT THING TO DO. DELETE BOOK
	const [books, setBooks] = useState([]);



	const addBook = (book) => {
		ipcRenderer.send('books:add', book);
	}




	useEffect(() => {
		function sortFunction(a,b){  
			var dateA = new Date(a.date)
			var dateB = new Date(b.date)
			return dateA > dateB ? 1 : -1;  
		}; 
		
		ipcRenderer.send('books:load');
		ipcRenderer.on('books:get', (e, fileBooks) => {
			if(fileBooks) {
				let booksParsed = JSON.parse(fileBooks);
				booksParsed.sort(sortFunction);
				setBooks(booksParsed);
			} else {
				console.log("adios")
			}

		})
	
	}, [])



	return (
		<HashRouter>
			<NavBar />
			<Switch>
				<Route exact path="/">
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
								})}
							</tbody>
						</Table>
					</Container>
				</Route>
				<Route exact path="/info" render={(props) => <Info {...props} allBooks={books} />}/>
				<Route exact path="/about" component={About} />
			
			</Switch>
		</HashRouter>
	)
}

export default App
