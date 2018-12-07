var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("/api/post", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save an example", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      name: "Alma Sotelo",
      email: "alma@gmail.com",
      phone: "+52(542)123466989",
      address: "Avenida 5, Col Juarez, Navojoa, Sonora",
      category: "abandono",
      report: "La vecina golpea a su perro Ayuda!!!",
      imageUrl: "image.png",
      status : false
    };

    // POST the request body to the server
    request
      .post("/api/post")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});

describe("/api/get", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Report.bulkCreate([
      { name: "Alma Sotelo",
        email: "alma@gmail.com",
        phone: "+52(542)123466989",
        address: "Avenida 5, Col Juarez, Navojoa, Sonora",
        category: "abandono",
        report: "La vecina golpea a su perro Ayuda!!!",
        imageUrl: "image.png",
        status : false 
      },
      { 
        name: "Alma Sotelo",
        email: "alma@gmail.com",
        phone: "+52(542)123466989",
        address: "Avenida 5, Col Juarez, Navojoa, Sonora",
        category: "abandono",
        report: "La vecina golpea a su perro Ayuda!!!",
        imageUrl: "image.png",
        status : false
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/get").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ name: "Alma Sotelo",
            email: "alma@gmail.com",
            phone: "+52(542)123466989",
            address: "Avenida 5, Col Juarez, Navojoa, Sonora",
            category: "abandono",
            report: "La vecina golpea a su perro Ayuda!!!",
            imageUrl: "image.png",
            status : false});

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ name: "Alma Sotelo",
            email: "alma@gmail.com",
            phone: "+52(542)123466989",
            address: "Avenida 5, Col Juarez, Navojoa, Sonora",
            category: "abandono",
            report: "La vecina golpea a su perro Ayuda!!!",
            imageUrl: "image.png",
            status : false });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});