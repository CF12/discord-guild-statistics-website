import React from 'react'

import { Card, Typography, CircularProgress } from 'material-ui'

export default class InfoCard extends React.Component {
  constructor (props) {
    super()
    this.state = {}
    this.path = props.path
    this.type = props.type
  }

  componentWillMount () {
    this.loadData(this.path)
  }

  loadData (path) {
    fetch(window.location.href + path)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ value: data[this.type] })
      })
  }

  render () {
    const value = this.state.value || undefined

    return (
      <div>
        {
          (value) ? (
            <div>
              <Card className='flex flex-center flex-column' style={{ width: '300px', height: '200px' }} elevation={10}>
                <Typography type='display1' align='center' color='primary'> Total Messages </Typography>
                <Typography type='headline' align='center'> {value} </Typography>
              </Card>
            </div>
          ) : (
            <div>
              <CircularProgress style={{ color: '#FFF' }} />
            </div>
          )
        }
      </div>
    )
  }
}
