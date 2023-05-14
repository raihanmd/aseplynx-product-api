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
      .query(`SELECT * FROM blog`)
      .then(([rows]) => rows)
      .catch((err) => {
        throw err;
      });
  },
  async select(slug) {
    return await con
      .promise()
      .query(`SELECT * FROM blog WHERE slug = '${slug}'`)
      .then(([rows]) => rows)
      .catch((err) => {
        throw err;
      });
  },
  async insert({ id, title, slug, author, body, createdAt }) {
    return await con
      .promise()
      .query(`INSERT INTO blog (id, title, slug, author, body, created_at) VALUES ('${id}', '${title}', '${slug}', '${author}', '${body}', '${createdAt}')`)
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
