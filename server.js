require('dotenv').config();
const minimist = require('minimist');
const compression = require("compression");
const optionsMinimist = {alias: { p: 'port' }};
const argv = minimist(process.argv.slice(2), optionsMinimist);

const session = require("express-session");
const passport = require("passport"); 
const cookieParser = require("cookie-parser");

const express = require('express');
const router = require('./routes');

const { options } = require("./options/messagesDB");
const knexChat = require("knex")(options);

const { optionsProducts } = require("./options/productsDB");
const knexProducts = require("knex")(optionsProducts);

const messagesController = require('./controllers/messages');
const messages = new messagesController(knexChat, 'messages');

const productsController = require('./controllers/products');
const products = new productsController(knexProducts, 'products');

const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

if (cluster.isPrimary) {
  console.log("num CPUs: " + numCPUs);
  console.log(`I am a master ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`${worker.process.pid} is finished`);
  });
} else {
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  const MongoStore = require("connect-mongo");
  const mongoose = require('mongoose');

  const PORT = argv.port || 8080;

  try {
      mongoose.connect(process.env.MONGO_URI);
      console.log('Successful database connection');
    } catch (err) {
      throw new Error('Ocurrió un error al conectarse a la base de datos.', err);
  }

  const advanceOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  app.use(cookieParser());

  app.use(
      session({
          store: new MongoStore({ 
              mongoUrl: process.env.MONGO_URI,
              mongoOptions: advanceOptions   
          }),     
          secret: process.env.SESSION_SECRET,
          resave: true,
          saveUninitialized: true,
          rolling: true,
          cookie: { maxAge: 60000 },
      })
  );

  app.use(compression());
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('view engine', 'ejs');
  app.set('views', './views');

  app.use(express.static('public'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/', router);

  io.on('connection', async function(socket) {
      console.log('Un cliente se ha conectado');

      socket.emit('products', await productsController.getAllFaker());
      socket.emit('messages', await messages.getAll());

      socket.on('new-message', async (data) => {
          await messages.save(data);
          io.sockets.emit('messages', await messages.getAll());
      });

      socket.on('new-product', async (data) => {
          await products.save(data);
          io.sockets.emit('products', await products.getAll());
      });
  });

  httpServer.listen(PORT, () => {
      console.log(`server on port ${PORT}`);
  })
console.log(`Worker ${process.pid} started`);
}