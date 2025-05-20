import UserModel from "../models/User";
import jwt from "jsonwebtoken";

export const Authenticate = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwt;
    console.log("received", token);

    if (!token) {
      return res.status(401).json("No token Authorization denied");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET || "secret");
    if (!decode || typeof decode === "string") {
      return res.status(401).json("Token is not valid");
    }

    const user = await UserModel.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json("user not found");
    }

    req.user = user;
    next();
  } catch (e: any) {
    console.error(e.message);
    return res.status(500).json("Internal server error during Authentication");
  }
};
