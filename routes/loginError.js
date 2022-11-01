const { Router } = require("express");
const loginError = Router();

loginError.get("/", (req, res) => {  
  res.render('pages/error', {error: 'Datos incorrectos', url: 'login'}) 
});


module.exports = loginError;