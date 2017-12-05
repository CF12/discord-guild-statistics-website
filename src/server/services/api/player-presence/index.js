const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const db = low(new FileSync(path.join(__dirname, '..', '..', '..', '..', '..', 'data', 'db.json')))

function handler (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(db.get('messages').value()))
}

module.exports = {
  handler: handler
}
