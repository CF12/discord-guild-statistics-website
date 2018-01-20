import React from 'react'

import './index.scss'

import { Card, Typography } from 'material-ui'

import UserPicker from './components/UserPicker.jsx'
import Graph from './components/Graph.jsx'
import FetchedInfoCard from './components/FetchedInfoCard.jsx'

const data = require('../../../../data/info.json')

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  updateState (value) {
    this.setState({ query: value })
  }

  render () {
    return (
      <div>
        <div className='hero flex flex-center flex-column'>
          <p className='hero__title title'> {data.name} </p>

          <img className='hero__icon hvr-grow-rotate' src={require('../../../../data/icon.png')} />
        </div>

        <div className='body flex flex-column flex-center'>
          <div className='body__cards flex flex-row'>
            <FetchedInfoCard path='api/statistics' type='messageCount' />
            <FetchedInfoCard path='api/statistics' type='messageCount' />
            <FetchedInfoCard path='api/statistics' type='messageCount' />
          </div>

          <div className='body__graph flex flex-row'>
            <Card className='body__sidebar' elevation={5}>
              <Typography align='center' type='headline' gutterBottom> Settings </Typography>

              <div className='flex flex-row flex-center-items'>
                <p className='body__sidebar__label'> User </p>
                <UserPicker handler={this.updateState.bind(this)} />
              </div>
            </Card>

            <Graph query={this.state.query} />
          </div>
        </div>

        <div className='footer flex flex-center'>
          <p className='footer__text'> Copyright © 2018 CF12 (Brian X) - All Rights Reserved </p>
        </div>
      </div>
    )
  }
}
