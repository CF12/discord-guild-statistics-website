const path = require('path')
const express = require('express')
const app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const BUILD_PATH = path.join(__dirname, '..', '..', 'build')
const DATA_PATH = path.join(__dirname, '..', '..', 'data')
const PORT = 3001

const db = low(new FileSync(path.join(DATA_PATH, 'db.json')))
const router = express.Router()

app.use(express.static(BUILD_PATH))
app.set('views', BUILD_PATH)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.json())

app.get('/', (req, res) => {
  res.render('index.html')
})

app.user('/api', router)

router.route('/users')
.get((req, res) => {
  let handler = require('./services/api/v1/state/playing/sum').handler(db)

  res.json({
    date: Date.now(),
    users: handler.getUsers()
  })
})

app.listen(PORT)
console.log('Listening on port: ' + PORT)
