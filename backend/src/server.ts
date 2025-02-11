import express, { query, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import create/connect db
import db from "./database";

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
const users: Iuser[] = [
  {
    email: "warranty@mail.com",
    username: "warranty001",
    password: "$2b$10$XUp3ghr7nNqb./YbLjM9i.4ksxAu0ZhfU39WDVaQ4L8yfth1inmSa",
  },
];

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

// Function valid form (check blank error input and return them)
const validForm = (body: Iitems): string[] => {
  // Declare erros
  const errors = [];

  // Check blank error 1 by 1
  if (!body.itemName) errors.push("itemName is required");
  if (!body.serialNumber) errors.push("serialNumber is required");
  if (!body.endDate) errors.push("endDate is required");

  // Return errors
  return errors;
};

// Function check warranty
const checkWarranty = (date: string) => {
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
app.get("/items", async (req: Request, res: Response) => {
  try {
    // Check valid token
    if (!validToken(req)) {
      // Return invalid token
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Query command for get all items
    const selectAllQuery = "SELECT * FROM items";

    // Get all items from db
    const items = await new Promise((resolve, reject) => {
      db.all(selectAllQuery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Return all items
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => get specific item ---------- */
app.get("/item/:id", async (req: Request, res: Response) => {
  try {
    // Check valid token
    if (!validToken(req)) {
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

    // Query command for find item
    const selectQuery = "SELECT * FROM items WHERE id = ?";
    const selectValue = getId;

    // Find item from db
    const getItem = await new Promise<Iitems[]>((resolve, reject) => {
      db.all(selectQuery, selectValue, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Iitems[]);
        }
      });
    });

    // Check when item not found
    if (!getItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Return specfic items
    res.status(200).json(getItem[0]);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => create item ---------- */
app.post("/create", async (req: Request, res: Response) => {
  try {
    // Check valid token
    if (!validToken(req)) {
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
    const { daysLeft, isWarranty } = checkWarranty(body.endDate);

    // Query command for create item
    const createQuery = "INSERT INTO items (itemName,serialNumber,endDate,notes,remainDays,isWarranty) VALUES (?,?,?,?,?,?)";
    const createValue = [body.itemName, body.serialNumber, body.endDate, body.notes, daysLeft, isWarranty];

    // Add new item to db
    await new Promise<void>((resolve, reject) => {
      db.run(createQuery, createValue, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Response create complete
    res.status(201).json({
      message: "create complete",
      newItem: {
        itemName: body.itemName,
        serialNumber: body.serialNumber,
        endDate: body.endDate,
        notes: body.notes,
        remainDays: daysLeft,
        isWarranty: isWarranty,
      },
    });
  } catch (error) {
    console.error("Error create item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => update item ---------- */
app.put("/item/:id", async (req: Request, res: Response) => {
  try {
    // Check valid token
    if (!validToken(req)) {
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

    // Query command for find update item
    const selectQuery = "SELECT * FROM items WHERE id = ?";
    const selectValue = [getId];

    // Find update item from db
    const updateItem = await new Promise((resolve, reject) => {
      db.get(selectQuery, selectValue, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Check when item not found
    if (!updateItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Get update warranty item data
    const { daysLeft, isWarranty } = checkWarranty(body.endDate);

    // Query command for update item
    const updateQuery =
      "UPDATE items SET itemName = ?, serialNumber = ?, endDate = ?, notes = ?, remainDays = ?,isWarranty = ? WHERE id = ?";
    const updateValue = [body.itemName, body.serialNumber, body.endDate, body.notes, daysLeft, isWarranty, getId];

    // Upate item to db
    await new Promise<void>((resolve, reject) => {
      db.run(updateQuery, updateValue, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Response update complete
    res.status(200).json({
      message: "update complete",
      data: {
        itemName: body.itemName,
        serialNumber: body.serialNumber,
        endDate: body.endDate,
        notes: body.notes,
        remainDays: daysLeft,
        isWarranty: isWarranty,
      },
    });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => delete item ---------- */
app.delete("/item/:id", async (req: Request, res: Response) => {
  try {
    // Check valid token
    if (!validToken(req)) {
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

    // Query command for find update item
    const selectQuery = "SELECT * FROM items WHERE id = ?";
    const selectValue = [getId];

    // Find update item from db
    const deleteItem = await new Promise((resolve, reject) => {
      db.get(selectQuery, selectValue, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Check when item not found
    if (!deleteItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // Query command for find update item
    const deleteQuery = "DELETE FROM items WHERE id = ?";
    const deleteValue = [getId];

    // Delete item from db
    await new Promise<void>((resolve, reject) => {
      db.run(deleteQuery, deleteValue, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Response delete complete
    res.status(200).json({
      message: "delete complete",
      data: deleteItem,
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
