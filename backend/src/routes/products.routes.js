const productsRouter = require("express").Router();
const checkAuthentication = require("../middlewares/auth.middleware");

productsRouter.get("/mobile", checkAuthentication, (req, res) => {
  res.status(200).json([
    {
      name: "Iphone 15",
      price: "55000",
    },
    {
      name: "Iphone 16",
      price: "65000",
    },
  ]);
});

module.exports = productsRouter;
