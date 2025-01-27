import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 8000;

// use bodatParser for path post
app.use(bodyParser.json());

// use cors to allow all domain
app.use(cors());

// define type items
interface Iitems {
  id: number;
  itemName: string;
  serialNumber: string;
  endDate: string;
  notes: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}

// store item list
const items: Iitems[] = [];

// define initial id
let id: number = 1;

// function valid form
const validForm = (body: Iitems): string[] => {
  const errors = [];
  if (!body.itemName) errors.push("itemName is required");
  if (!body.serialNumber) errors.push("serialNumber is required");
  if (!body.endDate) errors.push("endDate is required");
  if (!body.notes) errors.push("notes is required");
  return errors;
};

// function check warranty
const checkWanrranty = (date: string) => {
  const timeCurr = new Date();
  const timeEnd = new Date(date);

  // Reset hours to 00:00:00 for accurate day comparison
  timeCurr.setHours(0, 0, 0, 0);
  timeEnd.setHours(0, 0, 0, 0);

  const msDiff = timeEnd.getTime() - timeCurr.getTime();
  const dayDiff = Math.ceil(msDiff / (1000 * 60 * 60 * 24));

  const daysLeft = dayDiff >= 0 ? dayDiff + 1 : dayDiff;
  let isWarranty: "warranty" | "nearExpire" | "expired" = "warranty";

  if (daysLeft >= 30) {
    isWarranty = "warranty";
  } else if (daysLeft >= 0 && daysLeft < 30) {
    isWarranty = "nearExpire";
  } else {
    isWarranty = "expired";
  }

  return { daysLeft, isWarranty };
};

/** ---------- PATH => get all items ---------- */
app.get("/items", (req: Request, res: Response) => {
  try {
    // return all items
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => get specific item ---------- */
app.get("/item/:id", (req: Request, res: Response) => {
  try {
    // get id from params
    const getId: number = parseInt(req.params.id);

    // check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // find item by id
    const getItem = items.find((item) => item.id === getId);

    // check when item not found
    if (!getItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // return specfic item
    res.status(200).json(getItem);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ---------- PATH => create item ---------- */
app.post("/create", (req: Request, res: Response) => {
  try {
    // get data from body
    const body = req.body;

    //check valid body
    const errors = validForm(body);
    if (errors && errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }

    // check warranty item
    const { daysLeft, isWarranty } = checkWanrranty(body.endDate);

    // manage pattern data
    const newItem = {
      id: id,
      itemName: body.itemName,
      serialNumber: body.serialNumber,
      endDate: body.endDate,
      notes: body.notes,
      remainDays: daysLeft,
      isWarranty: isWarranty,
    };

    // add new item
    items.push(newItem);

    // increment id
    id += 1;

    // response command
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
    // get id from params
    const getId: number = parseInt(req.params.id);

    // check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // get data from body
    const body = req.body;

    //check valid body
    const errors = validForm(body);
    if (errors && errors.length > 0) {
      res.status(422).json({ errors: errors });
      return;
    }

    // find update item
    const updateItem = items.find((item) => item.id === getId);

    // check when item not found
    if (!updateItem) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // update item
    updateItem.itemName = body.itemName;
    updateItem.serialNumber = body.serialNumber;
    updateItem.endDate = body.endDate;
    updateItem.notes = body.notes;

    // response command
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
    // get id from params
    const getId: number = parseInt(req.params.id);

    // check if id is a valid number
    if (isNaN(getId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    // find delete index
    const deleteIndex = items.findIndex((item) => item.id === getId);

    // check when item not found
    if (deleteIndex === -1) {
      res.status(404).json({ error: `Item with ID:${getId} not found` });
      return;
    }

    // buffer delete data
    const deleteData = items[deleteIndex];

    // delete item
    items.splice(deleteIndex, 1);

    // response command
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
