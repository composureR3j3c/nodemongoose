const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    console.log("auth" +req.headers.authorization)
    const decoded = jwt.verify(req.headers.authorization.split(" ")[1], process.env.JWT_KEY, null);
    req.userData=decoded
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: "Auth Failed!" });
  }
  next();
};
