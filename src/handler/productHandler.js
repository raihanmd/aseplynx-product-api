const { default: slugify } = require("slugify");
const { database } = require("../connection/database");
const response = require("../response");
const { customAlphabet } = require("nanoid");
require("dotenv").config();

const nanoid = customAlphabet("1234567890", 10);
const productHandler = {
  async selectAllProduct(res) {
    try {
      const blogs = await database.selectAll();
      response(200, blogs, "Data Berhasil diambil", res);
    } catch (err) {
      response(500, "Internal Server Error.", err.message, res);
    }
  },
  async selectBlogByID(res, id) {
    try {
      const blogs = await database.select(id);
      if (blogs.length === 0) {
        const err = new Error(`Product dengan id ${id} tidak ditemukan.`);
        err.statusCode = 404;
        err.payload = "Blog not found.";
        throw err;
      }
      response(200, blogs, "Data Berhasil diambil", res);
    } catch (err) {
      response(err?.statusCode || 500, err?.payload || "Internal server error.", err.message, res);
    }
  },
  async insertProduct(res, req) {
    try {
      if (!req.token) {
        const err = new Error(`Hanya owner yang dapat melakuakn aksi POST.`);
        err.statusCode = 405;
        err.payload = "Method not allowed.";
        throw err;
      }
      if (req.token !== process.env.OWNER_TOKEN) {
        const err = new Error(`Token salah!`);
        err.statusCode = 401;
        err.payload = "Unauthorized";
        throw err;
      }
      const { name, quantity } = req,
        id = nanoid(),
        createdAt = Math.floor(Date.now() / 1000),
        updatedAt = createdAt;
      const newProduct = { id, name, quantity, createdAt, updatedAt };
      const fields = await database.insert(newProduct);
      const data = {
        isSucceed: fields.affectedRows,
      };
      response(201, data, "Data berhasil ditambahkan.", res);
    } catch (err) {
      response(err?.statusCode || 500, err?.payload || "Internal server error.", err.message, res);
    }
  },
  async deleteBlogByID(res, req) {
    try {
      if (!req.token) {
        const err = new Error(`Hanya owner yang dapat melakuakn aksi DELETE.`);
        err.statusCode = 405;
        err.payload = "Method not allowed.";
        throw err;
      }
      if (req.token !== process.env.OWNER_TOKEN) {
        const err = new Error(`Token salah!`);
        err.statusCode = 401;
        err.payload = "Unauthorized";
        throw err;
      }
      const { id } = req;
      const fields = await database.delete(id);
      const data = {
        isSucceed: fields.affectedRows,
      };
      response(202, data, "Data berhasil dihapus.", res);
    } catch (err) {
      response(err?.statusCode || 500, err?.payload || "Internal server error.", err.message, res);
    }
  },
};

module.exports = { productHandler };
