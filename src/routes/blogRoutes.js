const express = require("express");
const { blogHandler } = require("../handler/productHandler");
const router = express.Router();

router.get("/", (req, res) => blogHandler.selectAllBlogs(res));
router.get("/:slug", (req, res) => blogHandler.selectBlogBySlug(res, req.params.slug));
router.post("/", (req, res) => blogHandler.insertBlog(res, req.body));
router.delete("/", (req, res) => blogHandler.deleteBlogByID(res, req.body));

module.exports = router;
