const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

const listener = () => console.log(`Listening on Port ${PORT}!`);

async function start(){
  try{
    await knex.migrate.latest();
    await knex.seed.run();
    app.listen(PORT, listener);
  }catch(e){
    console.log(e);
  }
}


start();
// knex.migrate
//   .latest()
//   .then((migrations) => {
    
//   })
//   .catch(console.error);
