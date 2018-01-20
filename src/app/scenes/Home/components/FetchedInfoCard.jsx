import React from 'react'

import { Card, Typography, CircularProgress } from 'material-ui'

export default class InfoCard extends React.Component {
  constructor (props) {
    super()
    this.state = {}
    this.title = props.title
    this.path = props.path
    this.label = props.label
    this.type = props.type
    this.Icon = props.icon
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
                { (this.Icon) ? <this.Icon size={60} /> : undefined }

                <Typography type='display1' align='center' color='primary' gutterBottom> {this.title} </Typography>
                <Typography type='subheading' align='center'> {value + ' ' + this.label} </Typography>
              </Card>
            </div>
          ) : (
            <div>
              <CircularProgress />
            </div>
          )
        }
      </div>
    )
  }
}
