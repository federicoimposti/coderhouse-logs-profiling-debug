const { optionsProducts } = require("../options/productsDB");
const knex = require("knex")(optionsProducts);

knex.schema
  .createTable("products", (table) => {
    table.increments("id");
    table.string("title");
    table.string("price");
    table.string("image");
  })
  .then(() => {
    console.log("Table products created");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
