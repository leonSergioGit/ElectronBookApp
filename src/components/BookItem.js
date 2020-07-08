import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { ipcRenderer } from 'electron';
import EditModal from './EditModal';
import '../App.css';


const BookItem = ({ book, openModal }) => {

    
    const sendId = () => {
        ipcRenderer.send('books:delete', book.id);
    }



    return (
        <tr>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.language}</td>
            <td>{book.date.toString().substring(0, 10)}</td>
            <td>
                <Button variant='danger' size="sm" className="deleteButton" onClick={sendId}>
                    X
                </Button>

                <EditModal bookItem={book} />
            </td>
        </tr>
    )
}

export default BookItem;