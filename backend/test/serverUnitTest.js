let expect = require('chai').expect;
let request = require('request');
let server = require('../server');
let chai = require('chai');

describe('Status and API fetch', function () {

    it('status of server', function (done) {
        request('http://localhost:8000/users/listusers',
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
    });

    it('ensures user list is retrieved from the api', function (done) {
        request('http://localhost:8000/users/listusers',
            function (error, response, body) {
                let users = body;
                
                expect(users).to.contain("admin");
                done();
            });
    });
});