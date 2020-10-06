const express = require('express');
const app = express();

const request = require('request');
const cors = require('cors');
app.use(cors());
'use strict';

require('dotenv').config();
const apiKey = process.env.API_KEY;

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
  
  var queryParams = '&keywords='+keywords+'&itemFilter(0).name=MaxPrice&itemFilter(0).value='+maxPrice+'&itemFilter(0).paramName=Currency&itemFilter(0).paramValue=USD&itemFilter(1).name=MinPrice&itemFilter(1).value='+minPrice+'&itemFilter(1).paramName=Currency&itemFilter(1).paramValue=USD';
	
  var filterNumber = 2;
	
  if(typeof returnAccepted !== 'undefined'){
	queryParams += '&itemFilter('+ filterNumber +').name=ReturnsAcceptedOnly&itemFilter(' + filterNumber+ ').value=true';
	filterNumber++;
  }

  if(typeof freeShipping !== 'undefined'){
	queryParams += '&itemFilter('+ filterNumber +').name=FreeShippingOnly&itemFilter(' + filterNumber+ ').value=true';
	filterNumber++;
  }

  if(typeof expeditedShipping !== 'undefined'){
	queryParams += '&itemFilter('+ filterNumber +').name=ExpeditedShippingType&itemFilter(' + filterNumber+ ').value=Expedited';
	filterNumber++;
  }
	
  var conditionValueNumber = 0;
  var conditions = {
	"new": "1000",
	"used": "3000",
	"very_good": "4000",
	"good": "5000",
	"acceptable": "6000"
  }
  
  for(var condition in conditions){
	  if(('condition_' + condition) in req.query){
		  if(conditionValueNumber == 0){
			  queryParams += '&itemFilter(' + filterNumber + ').name=Condition';
		  }

		  queryParams += '&itemFilter(' + filterNumber + ').value(' + conditionValueNumber + ')=' + conditions[condition];
		  conditionValueNumber++;
	  }
  }
	
  if(typeof sortOrder !== 'undefined'){
	queryParams += '&sortOrder=' + sortOrder;
  }

  request(ebayAPIURL + queryParams, function (error, response, body) {
	console.error('error:', error);
	console.log('statusCode:', response && response.statusCode);
	console.log('body:', body);
	
	var jsonResponse = JSON.parse(body);
	
	res.send(jsonResponse.findItemsAdvancedResponse[0].searchResult[0]);
  });
  
})

module.exports = app.listen(8080, () => console.log('App is listening on port 8080.'))
