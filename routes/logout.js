const { Router } = require("express");
const logout = Router();
const User = require('../models/User');

logout.get("/", async (req, res) => {
  const { username } = await User.findById(req.user._id);  
  req.session.destroy((err) => { 
    if (!err) res.render('pages/logout', { username }); 
    else res.send("Error");
  });
});

module.exports = logout;