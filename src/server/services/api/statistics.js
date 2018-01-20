function handler (db, router) {
  router
  .get((req, res) => {
    res.json({
      messageCount: db.get('id.msg')
    })
  })
}

module.exports = handler
