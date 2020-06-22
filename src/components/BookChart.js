import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


const BookChart = ({ allBooks, spanish, english, french, japanese }) => {

    //NEXT CHART BY YEAR

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
                    }
                }}
              /> 
    );

    return (
        <div> {barChart} </div>
    )
}

export default BookChart;