var express = require('express');
var app = express();

const request = require('request');
const cors = require('cors');
app.use(cors());
'use strict';

require('dotenv').config();
const apiKey = process.env.API_KEY

// Only for testing
app.get('/', function (req, res) {
  res.send('hello world');
})

app.get('/api/v1.0/search', function(req, res) {
  
  var keywords = req.query.keywords;
  var minPrice = req.query.min_price;
  var maxPrice = req.query.max_price;
  var conditionNew = req.query.condition_new;
  var conditionUsed = req.query.condition_used;
  var conditionVeryGood = req.query.condition_very_good;
  var conditionGood = req.query.condition_good;
  var conditionAcceptable = req.query.condition_acceptable;
  var returnAccepted = req.query.return_accepted;
  var freeShipping = req.query.free_shipping;
  var expeditedShipping = req.query.expedited_shipping;
  var sortOrder = req.query.sort_order;
  
  var ebayAPIURL = 'https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=' + apiKey + '&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=25';
  
  var queryParams = '&keywords='+keywords+'&min_price='+minPrice+'&max_price='+maxPrice;
  
  if(typeof conditionNew !== 'undefined'){
	queryParams += '&condition_new=' + conditionNew;
  }

  if(typeof conditionUsed !== 'undefined'){
	queryParams += '&condition_used=' + conditionUsed;
  }

  if(typeof conditionVeryGood !== 'undefined'){
	queryParams += '&condition_very_good=' + conditionVeryGood;
  }

  if(typeof conditionGood !== 'undefined'){
	queryParams += '&condition_good=' + conditionGood;
  }

  if(typeof conditionAcceptable !== 'undefined'){
	queryParams += '&condition_acceptable=' + conditionAcceptable;
  }

  if(typeof returnAccepted !== 'undefined'){
	queryParams += '&return_accepted=' + returnAccepted;
  }

  if(typeof freeShipping !== 'undefined'){
	queryParams += '&free_shipping=' + freeShipping;
  }

  if(typeof expeditedShipping !== 'undefined'){
	queryParams += '&expedited_shipping=' + expeditedShipping;
  }

  if(typeof sortOrder !== 'undefined'){
	queryParams += '&sort_order=' + sortOrder;
  }
  
  request(ebayAPIURL + queryParams, function (error, response, body) {
	console.error('error:', error);
	console.log('statusCode:', response && response.statusCode);
	console.log('body:', body);
	
	var jsonResponse = JSON.parse(body);
	
	res.send(jsonResponse.findItemsAdvancedResponse[0].searchResult[0]);
  });
  
})

app.listen(8080, () => console.log('App is listening on port 8080.'))
