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

app.use('/api', router)

require('./services/api/users')(db, router.route('/users'))
require('./services/api/users/user')(db, router.route('/users/:id'))
require('./services/api/statistics')(db, router.route('/statistics'))

app.listen(PORT)
console.log('Listening on port: ' + PORT)
