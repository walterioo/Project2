var db = require("../models");

module.exports = function(app) {
  // Get all reports
  app.get("/api/get", function(res) {
    db.Reports.findAll({}).then(function(dbReports) {
      //var hbsObject = {reports: //dbReports};
      //res.render("index", hbsObject);
      res.json(dbReports);
    });
  });

  // Create a new example
  app.post("/api/post", function(req, res) {
    console.log(req.body);
    db.Report.create(req.body).then(function(dbReports) {
      res.json(dbReports);
    });
  });

  // Delete an example by id
  app.delete("/api/admin/:id", function(req, res) {
    db.Report.destroy({ where: { id: req.params.id }})
      .then((dbReports) => {
        res.json(dbReports);
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
