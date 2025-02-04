import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create an Express application
const app = express();

// Define the port for the server
const PORT = 8000;

// Use body Parser for path post
app.use(bodyParser.json());

// Use cors to allow all domain
app.use(cors());

/**
 *
 * Users manangement
 *
 */

// Define type user
interface Iuser {
  email: string;
  username: string;
  password: string;
}

// Declare my jwt signature key
const secret = "mysecret";

// Store users
const users: Iuser[] = [];

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

/** ---------- PATH => get users ---------- */
app.get("/users", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }
    // Reuturn all users
    res.status(200).json(users);
  } catch (error) {
    console.error("Error get users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => register user ---------- */
app.post("/register", async (req: Request, res: Response) => {
  try {
    // Get data from body
    const { email, username, password } = req.body;

    // Password hash function before push to data base
    const passwordHash = await bcrypt.hash(password, 10);

    // Declear userData
    const userData = {
      email,
      username,
      password: passwordHash,
    };

    // Check already exists user
    const existingUser = users.find((user) => user.email === userData.email || user.username === userData.username);
    if (existingUser) {
      // Return user already exists
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Add userData to users
    users.push(userData);

    // Return registerd complete
    res.status(201).json({ message: "User registered complete" });
  } catch (error) {
    console.error("Error register user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => login user ---------- */
app.post("/login", async (req: Request, res: Response) => {
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
});

/**
 *
 * Items manangement
 *
 */

// Define type items
interface Iitems {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}

// Store item list
const items: Iitems[] = [];

// Define initial id
let id: number = 1;

// Function valid form (check blank error input and return them)
const validForm = (body: Iitems): string[] => {
  // Declare erros
  const errors = [];

  // Check blank error 1 by 1
  if (!body.itemName) errors.push("itemName is required");
  if (!body.serialNumber) errors.push("serialNumber is required");
  if (!body.endDate) errors.push("endDate is required");
  if (!body.notes) errors.push("notes is required");

  // Return errors
  return errors;
};

// Function check warranty
const checkWanrranty = (date: string) => {
  const timeCurr = new Date();
  const timeEnd = new Date(date);

  // Reset hours to 00:00:00 for accurate day comparison
  timeCurr.setHours(0, 0, 0, 0);
  timeEnd.setHours(0, 0, 0, 0);

  // Calculate time diff
  const msDiff = timeEnd.getTime() - timeCurr.getTime();
  const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  // Adjust dayLeft format
  const daysLeft = dayDiff >= 0 ? dayDiff + 1 : dayDiff;

  // Define warranty status
  let isWarranty: "warranty" | "nearExpire" | "expired" = "warranty";

  // isWaranty condition
  if (daysLeft >= 30) {
    isWarranty = "warranty";
  } else if (daysLeft >= 0 && daysLeft < 30) {
    isWarranty = "nearExpire";
  } else {
    isWarranty = "expired";
  }

  // Return dayLeft and warranty status
  return { daysLeft, isWarranty };
};

/** ---------- PATH => get all items ---------- */
app.get("/items", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }
    // Return all items
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => get specific item ---------- */
app.get("/item/:id", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Get id from params
    const getId: number = parseInt(req.params.id);

    // Check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // Find item by id
    const getItem = items.find((item) => item.id === getId);

    // Check when item not found
    if (!getItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Return specfic item
    res.status(200).json(getItem);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => create item ---------- */
app.post("/create", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Get data from body
    const body = req.body;

    //Check valid body
    const errors = validForm(body);
    if (errors && errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }

    // Check warranty item
    const { daysLeft, isWarranty } = checkWanrranty(body.endDate);

    // Manage pattern data
    const newItem = {
      id: id,
      itemName: body.itemName,
      serialNumber: body.serialNumber,
      endDate: body.endDate,
      notes: body.notes,
      remainDays: daysLeft,
      isWarranty: isWarranty,
    };

    // Add new item
    items.push(newItem);

    // Increment id
    id += 1;

    // Response create complete
    res.status(201).json({
      message: "create complete",
      newItem: newItem,
    });
  } catch (error) {
    console.error("Error create item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => update item ---------- */
app.put("/item/:id", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Get id from params
    const getId: number = parseInt(req.params.id);

    // Check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // Get data from body
    const body = req.body;

    // Check valid body
    const errors = validForm(body);
    if (errors && errors.length > 0) {
      res.status(422).json({ errors: "Unprocessable Entity" });
      return;
    }

    // Find update item
    const updateItem = items.find((item) => item.id === getId);

    // Check when item not found
    if (!updateItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Get update warranty item data
    const { daysLeft, isWarranty } = checkWanrranty(body.endDate);

    // Update item
    updateItem.itemName = body.itemName;
    updateItem.serialNumber = body.serialNumber;
    updateItem.endDate = body.endDate;
    updateItem.notes = body.notes;
    updateItem.remainDays = daysLeft;
    updateItem.isWarranty = isWarranty;

    // Response update complete
    res.status(200).json({
      message: "update complete",
      data: updateItem,
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => delete item ---------- */
app.delete("/item/:id", (req: Request, res: Response) => {
  try {
    // Check valid token
    const isValidToken = validToken(req);
    if (!isValidToken) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Get id from params
    const getId: number = parseInt(req.params.id);

    // Check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // Find delete index
    const deleteIndex = items.findIndex((item) => item.id === getId);

    // Check when item not found
    if (deleteIndex === -1) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Buffer delete data
    const deleteData = items[deleteIndex];

    // Delete item
    items.splice(deleteIndex, 1);

    // Response delete complete
    res.status(200).json({
      message: "delete complete",
      data: deleteData,
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
