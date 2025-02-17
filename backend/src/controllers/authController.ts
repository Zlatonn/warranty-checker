import { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { users } from "../models/users";

// Using dotenv
dotenv.config();

// Declare my jwt signature key
const secret = process.env.JWT_SECRET || "mysecret";

/** ---------- Log in user ---------- */
export const logInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = users.find((user) => user.email === email);

    // If find user => check compare password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid username or password" });
      return;
    }

    // Create jwt token using username when log in success
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    res.status(200).json({ message: "Login complete", token });
  } catch (error) {
    console.log("Error log in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
