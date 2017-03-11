const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const database = require('./database')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(bodyParser.json())

app.delete('/comments/:id', function(req, res) {
    const id = req.params.id
    database.remove(id)
    res.sendStatus(200)
})

app.put('/comments/:id', function(req, res) {
    const comment = req.body.comment
    const id = req.params.id
    res.json(database.update(id, comment))
})


app.get('/comments', function (req, res) {
  res.json(database.list())
})

app.listen(3000, function () {
  console.log('Comments server listening on port 3000!')
})
