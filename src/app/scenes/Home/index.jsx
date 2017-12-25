import React from 'react'

import './index.scss'
import '../../assets/fonts/Montserrat-Regular.ttf'

import { Bar } from 'react-chartjs-2'

export default class Home extends React.Component {
  constructor () {
    super()
    this.graphData = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    this.state = {}
  }

  componentDidMount () {
    this.loadData()
  }

  loadData () {
    fetch(window.location.href + 'api/v1/state/playing')
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        data: data
      })
    })
  }

  handleChange (event) {
    this.setState({ query: event.target.value })
  }

  render () {
    let graphData = {}

    if (this.state.data) {
      let query = this.state.query || Object.keys(this.state.data)[0]
      graphData = {
        labels: Object.keys(this.state.data[query].data),
        datasets: [{
          label: 'hours',
          data: Object.values(this.state.data[query].data).map((value) => { return Number(((value * 0.0001) / 60).toFixed(2)) }),
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
    }

    return (
      <div>
        {
          (this.state.data) ? (
            <div>
              <select onChange={this.handleChange.bind(this)}>
                {Object.keys(this.state.data).map((key) => {
                  return <option value={key}> {key} </option>
                })}
              </select>
              <Bar data={graphData} options={this.graphOptions} width={1000} height={800} />
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )
        }
      </div>
    )
  }
}
