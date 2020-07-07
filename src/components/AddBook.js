import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';



const AddBook = ({ addBook }) => {
    const [bookName, setBookName] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookLanguage, setBookLanguage] = useState("");
    const [bookDate, setBookDate] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        const book = {
            id: uuidv4(),
            name: bookName,
            author: bookAuthor,
            language: bookLanguage,
            date: new Date(bookDate)
        }
        addBook(book);
    }

    return (
        <Card className="'mt-5 mb-3">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Row className="my-3">
                        <Col>
                            <Form.Control placeholder="Book name" value={bookName} onChange={e => setBookName(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                            <Form.Control placeholder="Author" value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Date" type="Date" value={bookDate} onChange={e => setBookDate(e.target.value)}/>
                        </Col>
                        <Col>
                            <Form.Control as="select" value={bookLanguage} onChange={e => setBookLanguage(e.target.value)}>
                                <option value="0">Select Language</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Japanese">Japanese</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row className="my-3">
                        <Col>
                            <Button type="submit" variant="secondary" block>
                                Add Book
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AddBook;
