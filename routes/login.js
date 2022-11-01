const { Router } = require("express");
const login = Router();
const passport = require("../middlewares/passport");

function auth(req, res, next) {
  if (req.session.user == "fede") return next();
  return res.status(401).send("Error de autenticación.");
}

login.get("/", (req, res) => {  
  res.render('pages/login'); 
});

login.post("/", passport.authenticate("local", { failureRedirect: "/login-error" }), (req, res) => {
    res.redirect("/");
  }
);

login.get("/privada", auth, (req, res) => {
  res.send("La ruta es privada.");
});

module.exports = login;