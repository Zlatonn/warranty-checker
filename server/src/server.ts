import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

// use cors to allow all domain
app.use(cors());

// use cors to allow specfic domain
// app.use(
//   cors({
//     origin: "http://localhost:5173", // อนุญาตให้โดเมนนี้เข้าถึง
//   })
// );

// define type items
interface Iitems {
  id: number;
  itemName: string;
  serialNumber: string;
  startDate: string;
  endDate: string;
  notes: string;
}

// store item list
const items: Iitems[] = [];

// define id
let id: number = 1;

// function valid form
const validForm = (body: Iitems): string[] => {
  const errors = [];
  if (!body.itemName) errors.push("itemName is required");
  if (!body.serialNumber) errors.push("serialNumber is required");
  if (!body.startDate) errors.push("startDate is required");
  if (!body.endDate) errors.push("endDate is required");
  if (!body.notes) errors.push("notes is required");
  return errors;
};

/** ----- PATH => get all items ----- */
app.get("/items", (req: Request, res: Response) => {
  // return all items
  res.json(items);
});

/** ----- PATH => get specific item ----- */
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
    res.json(getItem);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ----- PATH => create item ----- */
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

    // manage pattern data
    const newItem = {
      id: id,
      itemName: body.itemName,
      serialNumber: body.serialNumber,
      startDate: body.startDate,
      endDate: body.endDate,
      notes: body.notes,
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
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ----- PATH => update item ----- */
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
    updateItem.startDate = body.startDate;
    updateItem.endDate = body.endDate;
    updateItem.notes = body.notes;

    // response command
    res.status(201).json({
      message: "update complete",
      data: updateItem,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** ----- PATH => delete item ----- */
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
    res.json({
      message: "delete complete",
      data: deleteData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
