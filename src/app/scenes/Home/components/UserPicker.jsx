import React from 'react'

import { Select, MenuItem, CircularProgress } from 'material-ui'

export default class UserPicker extends React.Component {
  constructor (props) {
    super()
    this.props = props
    this.state = {}
  }

  componentWillMount () {
    this.loadData()
  }

  loadData () {
    fetch(window.location.href + 'api/users')
      .then((res) => res.json())
      .then((data) => {
        data = data.users
          .sort((a, b) => {
            a = a.username.toLowerCase()
            b = b.username.toLowerCase()

            if (a < b) return -1
            else if (a > b) return 1
            else return 0
          })

        this.setState({
          data: data
        })

        this.props.handler(data[0].id)
      })
  }

  handleChange (event) {
    this.setState({ query: event.target.value })
    this.props.handler(event.target.value)
  }

  render () {
    const data = this.state.data || undefined

    return (
      <div>
        {
          (data) ? (
            <Select value={this.state.query || data[0].id} onChange={this.handleChange.bind(this)}>
              {
                data.map((value) => {
                  return <MenuItem value={value.id}> {value.username + '#' + value.discriminator} </MenuItem>
                })
              }
            </Select>
          ) : (
            <div>
              <CircularProgress size={80} />
            </div>
          )
        }
      </div>
    )
  }
}
