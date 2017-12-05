import React from 'react'
import { render } from 'react-dom'

import './index.html'
import './assets/styles/reset.scss'

import Home from './scenes/Home/index.jsx'

class App extends React.Component {
  render () {
    return <Home />
  }
}

render(<App />, document.getElementById('app'))
