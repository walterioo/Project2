var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/get", function(req, res) {
    db.Report.findAll({}).then(function(dbReport) {
      // var hbsObject = {
      //   examples: dbReport
      // };
      //res.render("index", hbsObject);
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
    db.Report.destroy({ where: { id: req.params.id }})
      .then((dbReport) => {
        res.json(dbReport);
      });
  });

  app.put("/api/admin/status/:id", (req, res) => {
    db.Report.update({status: true},{where: {id:req.params.id}})
      .then(() => {
        res.redirect("/admin");
      });
  });

  app.put("/api/admin/comment/:id", (req, res) => {
    db.Report.update({comments: req.body.comments},{where: {id:req.params.id}})
      .then(() => {
        res.redirect("/admin");
      });
  });
};
