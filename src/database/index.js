const { Sequelize } = require("sequelize");
const { DB_NAME, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_HOST, NODE_ENV } =
  process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  database: DB_NAME,
  port: DB_PORT,
  username: DB_USERNAME,
  dialect: "mysql",
});

const DB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({});
    console.log("DATABASE CONNECTED ✅");
  } catch (error) {
    if (NODE_ENV === "production") {
      return console.log("DATABASE CONNECTION ERROR ❌");
    }
    return console.log("DATABASE CONNECTION ERROR ❌", { err: error });
  }
};

module.exports = { DB, sequelize };
