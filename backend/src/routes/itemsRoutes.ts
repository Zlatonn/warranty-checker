import express from "express";

import { getAllItems, getSingleItem, createItem, updateItem, deleteItem } from "../controllers/itemsController";

// Create Router
const router = express.Router();

// Path get all items => GET /items/
router.get("/", getAllItems);

// Path get single item => GET /items/:id
router.get("/:id", getSingleItem);

// Path create => POST /items/create
router.post("/create", createItem);

// Path update item => PUT /items/:id
router.put("/:id", updateItem);

// Path delete item => DELETE /items/:id
router.delete("/:id", deleteItem);

export default router;
