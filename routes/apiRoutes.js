var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/get", function(req, res) {
    db.Report.findAll({}).then(function(dbReport) {
      res.json(dbReport);
    });
  });

  // Create a new example
  app.post("/api/post", function(req, res) {
    console.log(req.body);
    db.Report.create(req.body).then(function(dbReport) {
      res.json(dbReport);
    });
  });

  // Delete an example by id
  app.delete("/api/admin/:id", function(req, res) {
    db.Report.destroy({ where: { id: req.params.id } })
      .then(function(dbReport) {
        res.json(dbReport);
      });
  });
};
