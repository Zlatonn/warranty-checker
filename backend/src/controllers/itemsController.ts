import { Request, Response } from "express";

import db from "../config/database";
import validToken from "../utils/validToken";
import validForm from "../utils/validForm";
import checkWarranty from "../utils/checkWarranty";
import { Items } from "../types/itemsType";

/** ---------- Get all item ---------- */
export const getAllItems = async (req: Request, res: Response) => {
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
};

/** ---------- Get specific item ---------- */
export const getSingleItem = async (req: Request, res: Response) => {
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
    const getItem = await new Promise<Items[]>((resolve, reject) => {
      db.all(selectQuery, selectValue, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as Items[]);
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
};
/** ---------- Create item ---------- */
export const createItem = async (req: Request, res: Response) => {
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
};

/** ---------- Update item ---------- */
export const updateItem = async (req: Request, res: Response) => {
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
};

/** ---------- Delete item ---------- */
export const deleteItem = async (req: Request, res: Response) => {
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
};
