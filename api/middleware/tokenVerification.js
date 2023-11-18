// set up token middleware here
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET_JWT = process.env.SECRET_JWT;

function tokenVerification(req, res, success) {
  const token = req.headers.authorization;
  console.log("TOKEN", token);

  if (!token) {
    return res.status(401).json({
      message: "Authentication failed: No token provided",
    });
  }

  const tokenWithoutBearer = token.split(" ")[1];

  jwt.verify(tokenWithoutBearer, SECRET_JWT, (error, decode) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Authentication failed: Token expired",
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Authentication failed: Invalid token",
        });
      } else {
        return res.status(401).json({
          message: "Authentication failed: Token validation error",
        });
      }
    }

    req.user = decode;
    success();
  });
}

export default tokenVerification