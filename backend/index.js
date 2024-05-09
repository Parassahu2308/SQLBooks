import Express from "express";
import Mysql from "mysql";

const app = Express();

app.use(Express.json());

const db = Mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "paras2308",
  database: "books",
});

// GET ALL BOOKS
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

// POST A NEW BOOK
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?) ";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, result) => {
    if (err) return res.json("Error");
    return res.json({
      message: "Added Successfully",
      data: {
        title: req.body.title,
        desc: req.body.desc,
        cover: req.body.cover,
      },
    });
  });
});

app.listen(8800, () => {
  console.log("Server is connected!");
});
