const express = require("express");
const { productHandler } = require("../handler/productHandler");
const router = express.Router();

router.get("/", (req, res) => productHandler.selectAllProduct(res));
router.get("/:id", (req, res) => productHandler.selectBlogByID(res, req.params.id));
router.post("/", (req, res) => productHandler.insertProduct(res, req.body));
router.delete("/", (req, res) => productHandler.deleteBlogByID(res, req.body));

module.exports = router;
