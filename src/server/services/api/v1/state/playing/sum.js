function returnUserPlayingDurations (data) {
  let res = {}
  let cache = {}

  for (let e of data) {
    let dataUsername = e.username
    let dataGame = (e.presence.game === '') ? 'none' : e.presence.game

    if (!(dataUsername in res)) res[dataUsername] = { data: {} }
    if (!(dataGame in res[dataUsername].data)) res[dataUsername].data[dataGame] = []
    if (!(dataUsername in cache)) cache[dataUsername] = { game: dataGame, time: e.time }

    if (cache[dataUsername].game !== dataGame) {
      res[dataUsername].data[cache[dataUsername].game].push(e.time - cache[dataUsername].time)
      cache[dataUsername] = { game: dataGame, time: e.time }
    }
  }

  return res
}

function calcPlayingDurationsSummed (data) {
  let res = {}
  let cache = {}

  for (let e of data) {
    let dataUsername = e.username
    let dataGame = (e.presence.game === '') ? 'none' : e.presence.game

    if (!(dataUsername in res)) res[dataUsername] = { data: {} }
    if (!(dataGame in res[dataUsername].data)) res[dataUsername].data[dataGame] = 0
    if (!(dataUsername in cache)) cache[dataUsername] = { game: dataGame, time: e.time }

    if (cache[dataUsername].game !== dataGame) {
      res[dataUsername].data[cache[dataUsername].game] += e.time - cache[dataUsername].time
      cache[dataUsername] = { game: dataGame, time: e.time }
    }
  }

  return res
}

function handler (db) {
  return (req, res) => {
    const data =
      db.get('states.presence')
        .filter({ bot: false })
        .value()

    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(calcPlayingDurationsSummed(data)))
  }
}

module.exports = {
  handler: handler
}
