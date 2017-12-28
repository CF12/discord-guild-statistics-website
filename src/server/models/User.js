class User {
  constructor (id, db) {
    this.id = id
    this.db = db

    this._calcPresenceSummary()
  }

  _calcPresenceSummary () {
    // let res = {}
    // let cache = {}
    //
    // for (let e of data) {
    //   let dataUsername = e.username
    //   let dataGame = (e.presence.game === '') ? 'none' : e.presence.game
    //
    //   if (!(dataUsername in res)) res[dataUsername] = { data: {} }
    //   if (!(dataGame in res[dataUsername].data)) res[dataUsername].data[dataGame] = 0
    //   if (!(dataUsername in cache)) cache[dataUsername] = { game: dataGame, time: e.time }
    //
    //   if (cache[dataUsername].game !== dataGame) {
    //     res[dataUsername].data[cache[dataUsername].game] += e.time - cache[dataUsername].time
    //     cache[dataUsername] = { game: dataGame, time: e.time }
    //   }
    // }

    let data = db.get('states.presence')
      .filter({ user: { id: this.id } })
      .value()

    return data
    // this.presenceSummary =
  }

  getPresenceSummary () {

  }
}
