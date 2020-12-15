const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/review');
const newrelic = require('newrelic')

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/api/reviews/:id', (req, res) => {
  db.find({ listing_id: 1 }, (err, results) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(results).end();
    }
  });
});

app.delete('/api/deleteReviews', (req, res) => {
  db.erase(req.body, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully deleted data')
    }
    res.status(200).send(result)
  })
})
app.post('/api/addReviews', (req, res) => {
  db.add(req.body, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully added data')
    }
    res.status(200).send(result)
  })
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
