var db = require("../models"),
  passport = require("../config/passport");

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

  // Passport Routes

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.get("/login", function(req,res) {
    res.render("index", {message: req.falsh("loginMessage")});
  });
  
  app.post("/login", passport.authenticate("local", {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    successRedirect : "/admin",
    failureRedirect: "/#loginModal",
    failureFlash: true
  }));  
  
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};