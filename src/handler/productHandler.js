const { default: slugify } = require("slugify");
const { database } = require("../connection/database");
const response = require("../response");
const { customAlphabet } = require("nanoid");
require("dotenv").config();

const nanoid = customAlphabet("1234567890", 10);
const blogHandler = {
  async selectAllBlogs(res) {
    try {
      const blogs = await database.selectAll();
      response(200, blogs, "Data Berhasil diambil", res);
    } catch (err) {
      response(500, "Internal Server Error.", err.message, res);
    }
  },
  async selectBlogBySlug(res, slug) {
    try {
      const blogs = await database.select(slug);
      if (blogs.length === 0) {
        const err = new Error(`Blog dengan slug ${slug} tidak ditemukan.`);
        err.statusCode = 404;
        err.payload = "Blog not found.";
        throw err;
      }
      response(200, blogs, "Data Berhasil diambil", res);
    } catch (err) {
      response(err?.statusCode || 500, err?.payload || "Internal server error.", err.message, res);
    }
  },
  async insertBlog(res, req) {
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
      const { title, author, body } = req,
        id = nanoid(),
        slug = slugify(title, { lower: true });
      createdAt = Math.floor(Date.now() / 1000);
      const newBlog = { id, title, slug, author, body, createdAt };
      const fields = await database.insert(newBlog);
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

module.exports = { blogHandler };
