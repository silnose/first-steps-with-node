var supertest = require("supertest");
var should = require("should");
var chai = require('chai');
var request = require("http");



// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return home page", function (done) {

        // calling home page api
        server
            .get("/")
            //.expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                //res.body.error.should.equal(0);
                //res.body.error.should.be.false;

                done();
            });
    });

});


// In this test it's expected a task list of two tasks
describe('GET /books', function () {
    it('returns a list of books', function (done) {
        server.get('/books')
            .expect(200)
            .end(function (err, res) {
                //chai.expect(res.body).to.have.lengthOf(7);
                //
                if (err) res.send(err);
                //If no errors, send them back to the client
                //res.json(books);
                done(err);

            });
    });
});