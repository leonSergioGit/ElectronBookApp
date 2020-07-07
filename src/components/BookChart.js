import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import '../App.css';


const BookChart = ({ allBooks, spanish, english, french, japanese }) => {

    const [books, setBooks] = useState(null); 
    const [years, setYears] = useState([]);

    const [japNum, setJapNum] = useState(0);

    let yearsArr = [];
    let booksPerYear = [];
    useEffect(() => {
       console.log(books)
       setBooks(allBooks);
    }, [allBooks])

    if(books === null){
        console.log("hola")
    } else {
        //SORT YEARS
        books.forEach((book) => {
            if(!yearsArr.includes(book.date.substring(0, 4))){
                yearsArr.push(book.date.substring(0, 4));
            }
        })

        yearsArr.forEach((year) => {
            let counter = 0;
            books.forEach((book) => {
                if(book.date.substring(0, 4) === year){
                    counter++;
                }
            })

            booksPerYear.push(counter);
        })

        console.log(booksPerYear);

    }

    const barChart = (
              <Bar 
                data={{
                    labels: ['Spanish', 'English', 'Japanese', 'French'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)',
                            'rgba(255, 0, 0, 0.5)'

                        ],
                        data: [spanish, english, japanese, french]
 
                    }],
                    
                }}
                options={{
                    legend: {
                        display: false,
                        fontColor: 'white'
                    },
                    title: {
                        display: true, 
                        text:`Current state in`,
                        fontColor: 'white'
                    },
                    scales: {
                        yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                        }]
                    }
                }}
              /> 
    );

    const lineChart = (
            <Line 
            data={{
                labels: yearsArr.map(year => year),
                datasets: [{
                    data: booksPerYear.map(num => num),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true
                }]
            }}

            options={{
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 18
                    }
                }
            }}
            /> 
        );

    return (
        <div className="chartContainer">
            <div>{lineChart}</div>
            <div> {barChart} </div>
        </div>
        
    )
}

export default BookChart;