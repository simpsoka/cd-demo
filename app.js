
// if (!process.env.DATABASE_URL) {
//  console.error('😵  DATABASE_URL is required 😵');
//  process.exit(0);
// }

var express = require('express')
var app = express();
var bodyParser = require('body-parser')
var trips = require('./data/trips');
var _ = require('underscore');

// var Knex = require('knex');
// var URL = require('url');
// var pg_server = URL.parse(process.env.DATABASE_URL, true);
// var knex = Knex({
//   client: 'pg',
//   pool: { min: 0, max: 7 },
//   connection: {
//     host: pg_server.hostname,
//     port: pg_server.port,
//     ssl: pg_server.query.ssl,
//     database: pg_server.pathname.substring(1),
//     user: pg_server.auth.split(':')[0],
//     password: pg_server.auth.split(':')[1]
//   }
// });

app.use(express.static('public'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', { season: 'summer'});
});

app.get('/trips', function(req, res) {
  res.render('trips', trips);
});

app.get('/reservations/new', function(req, res) {
  res.render('reservation', _.extend(trips, req.query));
});

app.post('/reservations/new', function(req, res){
  // knex('tableName').insert({
  //   req.body.name,
  //   req.body.email,
  //   req.body.trip_id
  // }).then(function() {
  //   res.sendStatus(201);
  // })
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Example app listening on port 3000!');
});
