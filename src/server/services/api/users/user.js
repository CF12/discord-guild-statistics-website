function handler (db, router) {
  router
  .get((req, res) => {
    const id = req.params.id
    const user = db.get(`users.${id}`).value()

    if (user) res.json(user)
    else {
      res.status(404)
      res.json({
        error: {
          code: 404,
          message: `User ID not found: ${id}`
        }
      })
    }
  })
}

module.exports = handler
