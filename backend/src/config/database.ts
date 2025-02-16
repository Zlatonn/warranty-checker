import sqlite3 from "sqlite3";
import dotenv from "dotenv";

// Using dotenv
dotenv.config();

// Create / Connect DB
const db = new sqlite3.Database(process.env.DB_PATH || "./src/config/database.db", (err) => {
  if (err) {
    return console.log("Error opening database:", err.message);
  }
  console.log("Connected SQLite database.");
});

// Create items table if not exists
db.run(
  `CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  itemName TEXT NOT NULL,
  serialNumber TEXT NOT NULL,
  endDate TEXT NOT NULL,
  notes TEXT NOT NULL,
  remainDays INTEGER,
  isWarranty TEXT 
  )`,
  (err) => {
    if (err) {
      console.log("Error creating items table:", err.message);
    }
  }
);

export default db;
