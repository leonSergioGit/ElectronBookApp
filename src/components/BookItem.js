import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


const BookItem = ({ book }) => {



    return (
        <tr>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.language}</td>
            <td>{book.date.toString()}</td>
            <td>
                <Button variant='danger' size="sm" >
                    X
                </Button>
            </td>

        </tr>
    )
}

export default BookItem;