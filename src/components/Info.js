import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import BookChart from './BookChart';


const Info = ({ allBooks }) => {

    const [japaneseBooks, setJapaneseBooks] = useState(0);
    const [englishBooks, setEnglishBooks] = useState(0);
    const [spanishBooks, setSpanishBooks] = useState(0);
    const [frenchBooks, setFrenchBooks] = useState(0);



    useEffect(() => {
        setJapaneseBooks(booksByLanguages("Japanese"));
        setSpanishBooks(booksByLanguages("Spanish"));
        setEnglishBooks(booksByLanguages("English"));
        setFrenchBooks(booksByLanguages("French"));
    }, [])


    
    const booksByLanguages = (language) => {
        let counter = 0;
        allBooks.forEach((book) => {
            if(book.language === language){
                counter++;
            }
        })
        return counter;
    }

    return (
        <div>
            <h1 className="justify-content-center text-center">Total books: {allBooks.length}</h1>
            <BookChart  allBooks={allBooks} japanese={japaneseBooks} english={englishBooks} french={frenchBooks} spanish={spanishBooks} />
            <CardGroup>
                <Card>
                    <Card.Body>
                    <h1 className="justify-content-center text-center">{spanishBooks}</h1>
                        <h3 className="justify-content-center text-center">Spanish Books</h3>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                    <h1 className="justify-content-center text-center">{englishBooks}</h1>
                        <h3 className="justify-content-center text-center">English Books</h3>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                    <h1 className="justify-content-center text-center">{japaneseBooks}</h1>
                    <h3 className="justify-content-center text-center">Japanese Books</h3>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Body>
                        <h1 className="justify-content-center text-center">{frenchBooks}</h1>
                        <h3 className="justify-content-center text-center">French Books</h3>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    )
}

export default Info;