const express = require("express");
var cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const blogRoutes = require("./routes/blogRoutes");

app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", async (req, res) => {
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.status(200).json({ message: "Halo! selamat datang di web API ku!", endpoint: "/blog : to get all blogs" });
});

app.use("/blog", blogRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log("Server Berjalan di Port : " + port);
});

module.exports = app;
