const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 3000

const app = express();
app.use(bodyParser.json());
app.use(cors());

let issue = {};

app.route('/issues')
  .post((req, res) => {
    if (!req.body.id) {
      res.status(400).send('ID field is required')
    }
    issue[req.body.id] = JSON.stringify(req.body);
    res.json(req.body);
  })
  .get((_, res) => {
    const issues = Object.values(issue).map(jsonVal => JSON.parse(jsonVal));
    res.json(issues);
  })
  .put((req, res) => {
    if (!req.body.id) {
      res.status(400).send('ID field is required')
    }
    issue[req.body.id] = JSON.stringify(req.body);
    res.json(req.body);
  })
  .delete((req, res) => {
    if (!req.body.id) {
      res.status(400).send('ID field is required')
    }
    issue[req.body.id] = undefined;
    res.json(req.body)
  })

app.get('/issues/:id', (req, res) => {
  const result = issue[req.params.id];
  if (result !== undefined) {
    res.json(JSON.parse(result));
  } else {
    res.status(400).send('ID not found')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;