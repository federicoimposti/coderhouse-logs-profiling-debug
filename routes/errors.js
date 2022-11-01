const { Router } = require("express");
const logger = require("../logs/logger");

const error = Router();

error.get("*", (req, res) => {
  res.json({ error : -2, descripcion: `Ruta inexistente` })
  logger.warn(`Ruta '${req.originalUrl}' Inexistente - Método '${req.method}'`);  
});

error.delete("*", (req, res) => {
    res.json({ error : -2, descripcion: `Ruta inexistente` })
    logger.warn(`Ruta '${req.originalUrl}' Inexistente - Método '${req.method}'`);  
});

error.put("*", (req, res) => {
    res.json({ error : -2, descripcion: `Ruta inexistente` })
    logger.warn(`Ruta '${req.originalUrl}' Inexistente - Método '${req.method}'`);  
});

error.post("*", (req, res) => {
    res.json({ error : -2, descripcion: `Ruta inexistente` })
    logger.warn(`Ruta '${req.originalUrl}' Inexistente - Método '${req.method}'`);  
});

module.exports = error;