import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';


const Info = ({ allBooks }) => {

    const [japaneseBooks, setJapaneseBooks] = useState(0);



    useEffect(() => {
        booksByLanguages()
    }, [])


    
    const booksByLanguages = () => {
        allBooks.forEach((book) => {
            if(book.language === "Japanese"){
                setJapaneseBooks(japaneseBooks + 1)
            }
        })
    }

    return (
        <div>
            hola
        </div>
    )
}

export default Info;