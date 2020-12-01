const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/review');

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
