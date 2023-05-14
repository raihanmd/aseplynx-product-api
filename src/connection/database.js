const { createPool } = require("mysql2");
require("dotenv").config();

const con = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const database = {
  async selectAll() {
    return await con
      .promise()
      .query(`SELECT * FROM products`)
      .then(([rows]) => rows)
      .catch((err) => {
        throw err;
      });
  },
  async select(id) {
    return await con
      .promise()
      .query(`SELECT * FROM products WHERE id = '${id}'`)
      .then(([rows]) => rows)
      .catch((err) => {
        throw err;
      });
  },
  async insert({ id, name, quantity, createdAt, updatedAt }) {
    return await con
      .promise()
      .query(`INSERT INTO products (id, name, quantity, created_at, updated_at) VALUES ('${id}', '${name}', '${quantity}', '${createdAt}', '${updatedAt}')`)
      .then(([fileds]) => fileds)
      .catch((err) => {
        throw err;
      });
  },
  async delete(id) {
    return await con
      .promise()
      .query(`DELETE FROM blog WHERE id = '${id}'`)
      .then(([fileds]) => fileds)
      .catch((err) => {
        throw err;
      });
  },
};

module.exports = { database };
