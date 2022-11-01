const { options } = require("../options/messagesDB");
const knex = require("knex")(options);

knex.schema
  .createTable("messages", (table) => {
    table.increments("id");
    table.string("email");
    table.string("text");
    table.string("date");
  })
  .then(() => {
    console.log("Table messages created");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
