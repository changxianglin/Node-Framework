const express = require('express')
const handlebars = require('express3-handlebars').create({defaultLayout: 'main'})

const app = express()

app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname + '/public'))

let fortunes = [
  'Conquer your fears or they will conquer you.',
  'Rovers need springs.',
  'Do not fear what you do not know.',
  'You will have a pleasant surprise.',
  'Whenever possible, keep it simple.',
]

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  let randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
  res.render('about', { fortunes: randomFortune })
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500)
  res.render('500')
})

app.listen(app.get('port'), () => {
  console.log('Express started on http://localhost: ' + app.get('port') + ';press Ctrl+C to terminate.')
})
