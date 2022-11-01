const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.render("pages/login");
    }
  };
  
module.exports = auth;