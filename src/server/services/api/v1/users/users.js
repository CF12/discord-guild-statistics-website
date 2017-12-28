const _ = require('lodash')

function handler (db, router) {
  router
  .get((req, res) => {
    let users = {}
    db.get('users')
      .mapValues((e) => { users = _.assign(users, _.pick(e, 'user')) })
    console.log(users)

    res.json({

      timestamp: Date.now(),
      users: users
    })
  })
}

module.exports = handler
