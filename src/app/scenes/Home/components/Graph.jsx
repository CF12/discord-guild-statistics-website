import React from 'react'

import { Bar } from 'react-chartjs-2'
import { CircularProgress } from 'material-ui'

const _ = require('lodash')

export default class Graph extends React.Component {
  constructor (props) {
    super()

    this.props = props
    this.state = {}
  }

  componentWillReceiveProps (nextProps) {
    this.loadUser(nextProps.query)
  }

  getUserPresenceSummary (data) {
    let res = {}
    let cache = { game: data[0].presence.game, time: data[0].time }

    for (let e of data) {
      const game = e.presence.game
      if (!(game in res)) res[game] = 0

      if (cache.game !== game) {
        res[cache.game] += e.time - cache.time
        cache = { game: game, time: e.time }
      }
    }

    if ('' in res) {
      res['none'] = res['']
      delete res['']
    }

    return res
  }

  loadUser (id) {
    fetch(window.location.href + 'api/users/' + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          data: data
        })
      })
  }

  render () {
    const stateData = this.state.data
    let graphData = {}

    if (stateData) {
      const data = this.getUserPresenceSummary(stateData.states.presence)

      graphData = {
        labels: _.keys(data),
        datasets: [{
          label: 'hours',
          data: _.values(data).map((value) => { return Number(((value * 0.0001) / 60).toFixed(2)) }),
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
          (stateData) ? (
            <div>
              <Bar data={graphData} options={{
                title: {
                  display: true,
                  fontSize: 18,
                  fontFamily: 'Roboto',
                  text: `${stateData.user.username}'s graph`
                }
              }} width={1000} height={800} />
            </div>
          ) : (
            <div className='flex flex-center' style={{
              width: '1000px',
              height: '800px'
            }}>
              <CircularProgress size={80} />
            </div>
          )
        }
      </div>
    )
  }
}
