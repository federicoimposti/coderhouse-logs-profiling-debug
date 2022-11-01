const { Router } = require("express");
const randoms = Router();
const numCPUs = require("os").cpus().length;
const minimist = require('minimist');

const optionsMinimist = {alias: { p: 'port' }};
const argv = minimist(process.argv.slice(2), optionsMinimist);

randoms.get("/", (req, res) => {
  const randomNum = () => Math.floor(Math.random() * 10000);
  const info = {
    num_random: randomNum(),
    cpu_processes: numCPUs,
    port: argv.port,
  }
  res.send(info); 
});

module.exports = randoms;