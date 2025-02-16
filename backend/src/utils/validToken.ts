import { Request } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { users } from "../models/users";

// Using dotenv
dotenv.config();

// Declare my jwt signature key
const secret = process.env.JWT_SECRET || "mysecret";

// Check validToken function (if have token => true / haven't token => false)
const validToken = (req: Request): boolean => {
  // Get token in headers
  const authHeader = req.headers["authorization"];
  const authToken = authHeader && authHeader.split(" ")[1];

  // Check no have token
  if (!authToken) {
    return false;
  }

  // Try to check token
  try {
    // Verify token invalid or expired
    const currUser = jwt.verify(authToken, secret) as jwt.JwtPayload;

    // Check user in data base
    const checkUser = users.find((user) => user.email === currUser.email);
    if (!checkUser) {
      return false;
    }
    // When check token error => always return false
  } catch (error) {
    return false;
  }

  // If have token is valid
  return true;
};

export default validToken;
