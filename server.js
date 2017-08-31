const express = require('express');
const app = express();


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');

    next();
}

app.use(allowCrossDomain);

const data = require('./data.js');

app.get('/search', (req, res) => {

  console.log('query', req.query.q);

  let results;

  if (req.query.q !== undefined) {
    results = data.filter((x) => {
      return x.name.toLowerCase().indexOf(req.query.q) > -1
        || x.bio.toLowerCase().indexOf(req.query.q) > -1
        || x.skills.indexOf(req.query.q) > -1
    });
  }
  else {
    results = data;
  }

  res.json({
    results: results.map((x => {
      return { id: x.id, name: x.name }
    }))
  })
});

app.get('/detail/:id', (req, res) => {
  const foundItem = data.find((x) => x.id == req.params.id);
  res.json(foundItem);
});

app.listen(4000, function() {
  console.log('Listening on port 4000');
});
