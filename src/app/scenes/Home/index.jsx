import React from 'react'

import './index.scss'
import '../../assets/fonts/Montserrat-Regular.ttf'

import { Bar } from 'react-chartjs-2'

const options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 2
  }]
}

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Bar data={data} options={options} width={1000} height={800} />
        {/* <p>Hello World!</p> */}
      </div>
    )
  }
}
