let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

//Assertion style
chai.should();
chai.use(chaiHttp);


describe('eBay Backend', () =>{
	
	describe('GET /api/v1.0/search', () => {
		it("It should get all results", (done) => {
			chai.request(server)
				.get("/api/v1.0/search?keywords=iphone&min_price=1&max_price=500&sort_order=BestMatch")
				.end((err, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('item');
					done();
				});
		}).timeout(10000);
		
		it("It should NOT get all results", (done) => {
			chai.request(server)
				.get("/api/v1.0/searchES?keywords=iphone&min_price=1&max_price=500&sort_order=BestMatch")
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});
	});
});