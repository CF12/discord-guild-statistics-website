const _ = require('lodash')

function handler (db, router) {
  router
  .get((req, res) => {
    let users = []
    _.forOwn(db.get('users').value(), (e) => { users.push(e.user) })

    res.json({
      users: users
    })
  })
}

module.exports = handler
