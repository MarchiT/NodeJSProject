var express = require('express');
var path = require('path');
var router = express.Router();

var dbProvider = require('../modules/mongodb-provider.js');

/* GET home page. */

router.get('/test', function(request, response, next){
  response.sendFile(path.join(__dirname, '../views/layouts', 'test.html'));
})

router.get('/all', function(request, response, next){
  response.sendFile(path.join(__dirname, '../views/layouts', 'list.html'));
});

router.get('/index', function(request, response, next){
  response.sendFile(path.join(__dirname, '../views/layouts', 'react-details.html'));
});

router.get('/:page', function(request, response, next){
  console.log('Get all');
  console.log('Page: ' + request.params.page);
  console.log('Limit: ' + request.query.limit);
  // dbProvider.provideList(response);
  dbProvider.paginate(request, response);
});

router.post('/', function(request, response, next){
  dbProvider.saveCharacter(request, response);
});

router.get('/pet/:name', function(request, response, next){
  console.log("Find pet by name: " + request.params.name);
	dbProvider.queryData({}, request.params.name, response);
});

module.exports = router;
