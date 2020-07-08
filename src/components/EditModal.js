import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ipcRenderer } from 'electron';


const EditModal = ({ bookItem }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [bookName, setBookName] = useState(bookItem.name);
    const [bookAuthor, setBookAuthor] = useState(bookItem.author);
    const [bookLanguage, setBookLanguage] = useState(bookItem.language);
    const [bookDate, setBookDate] = useState(bookItem.date.toString().substring(0, 10));

    const onSubmit = (e) => {
      e.preventDefault();
      const book = {
          id: bookItem.id,
          name: bookName,
          author: bookAuthor,
          language: bookLanguage,
          date: new Date(bookDate)
      }
      ipcRenderer.send('books:edit', book);
      handleClose();
      
    }


    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Edit
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>


          <Modal.Body>
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
        </Modal.Body>


          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default EditModal;