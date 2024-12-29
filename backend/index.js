const express = require("express");
require("dotenv").config();
require("./src/db/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routes/user.routes");
const productsRouter = require("./src/routes/products.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/auth", router);
app.use("/api/v1/products", productsRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
