//region Base Setup=================================
var express = require('express');
var app = express();
var path=require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
//endregion

//region Middleware==================================
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(express.static(path.join(__dirname,'dist')));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
//endregion

//region Setup APIRouter===================================
const apiRouter = require('./server/apiRouter.js');
//endregion

//region Routes=======================================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

app.use('/api', apiRouter);
//endregion

//region Start Server===================================
app.listen(port);
console.log('App listening at port' + port);
