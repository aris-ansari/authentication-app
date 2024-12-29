const jwt = require("jsonwebtoken");

const checkAuthentication = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorized user!",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "JWT token is wrong or expired!",
    });
  }
};

module.exports = checkAuthentication;