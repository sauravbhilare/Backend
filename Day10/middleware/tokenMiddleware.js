import jwt from "jsonwebtoken";
const tokenDecoder = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false });
    }
    const decoded = jwt.verify(token, process.env.APP_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in tokenDecoder Middleware:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export default tokenDecoder;
