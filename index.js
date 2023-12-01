const express = require("express");
const app = express();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeServerAndDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log(`Hello Dev! Server is Running...`);
    });
  } catch (err) {
    console.log(`Db Error: ${err.message}`);
  }
};

initializeServerAndDb();

app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT * FROM book ORDER BY book_id;`;
  const allBooksArray = await db.all(getBooksQuery);
  response.send(allBooksArray);
});
