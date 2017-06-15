var express = require('express');
var path = require('path');
var router = express.Router();

var dbProvider = require('../modules/mongodb-provider.js');

/* GET home page. */


router.get('/index', function(request, response, next){
  response.sendFile(path.join(__dirname, '../views/layouts', 'react-details.html'));
  // response.sendFile('/home/marina/JS_Project/project/views/layouts/react-details.html');
});

router.get('/', function(request, response, next){
	console.log('Get all');
  dbProvider.provideList(response);
	// dbProvider.paginate(request, response);
});

router.post('/', function(request, response, next){
	dbProvider.saveCharacter(request, response);
});

router.post('/:type/image', function(request, response, next){
	// dbProvider.saveImage(request, response);
});

router.get('/:type/image', function(request, response, next){
	// dbProvider.getImage(request, response);
});

router.get('/:type', function(request, response, next){
	// dbProvider.queryData({}, request.params.type, response);
});

module.exports = router;
