const path = require('path')
const express = require('express')
const app = express()

const BUILD_PATH = path.join(__dirname, '..', '..', 'build')
const PORT = 3001

app.use(express.static(BUILD_PATH))
app.set('views', BUILD_PATH)
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.json())

app.get('/api/player-presence', require('./services/api/player-presence/index').handler)

app.get('/*', (req, res) => {
  res.render('index.html')
})

app.listen(PORT)
console.log('Listening on port: ' + PORT)
