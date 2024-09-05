import { log } from "console";
import exp from "constants";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];

  console.log({ token });
  console.log("hello ");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(decoded);

    req.userId = (decoded as JwtPayload).userId;
    console.log("hello1");

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default verifyToken;
