const { Router } = require("express");
const info = Router();

const processData = {
  entry_args: process.argv.slice(2),
  platform_name: process.platform,
  node_version: process.version,
  path: process.execPath,
  process_id: process.pid,  
  project_folder: process.cwd(),
}

info.get("/", (req, res) => {  
  res.render('pages/info', { processData });
});

module.exports = info;