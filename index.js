import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysqldbms#1",
  database: "bank",
});

app.get("/", (req, res) => {
  const q = "use bank";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Using bank database");
  });
});

///Getting output of queries from the database
app.get("/q1", (req, res) => {
  const q = "select * from branch where Loc='New York'";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/q2", (req, res) => {
  const q =
    "SELECT c.name, c.gender, a.AccountNo FROM customer c JOIN outstandingpayments a ON c.AccountNo = a.AccountNo WHERE a.OutstandingDues > 25000";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/q3", (req, res) => {
  const q = "CALL list_employees_without_loan_accounts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data[0]);
  });
});

app.get("/q4", (req, res) => {
  const q =
    "SELECT t.*, a.balance FROM transactionlogs t JOIN nonloanaccounts a ON t.AccountNo = a.AccountNo WHERE t.TransactionType = '0'";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/q5", (req, res) => {
  const q = "select * FROM accounttype";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

///Posting data to the database
app.post("/p1", (req, res) => {
  const q = "CALL insert_employee(?)";
  const values = [
    req.body.eid,
    req.body.ename,
    req.body.branchId,
    req.body.DOE,
    req.body.Designation,
    req.body.Salary,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    return res.json("Employee added successfully.");
  });
});

app.post("/p2", (req, res) => {
  const q =
    "INSERT INTO customer (`Name`, `CustomerId`,`DOB`,`Gender`,`AccountNo`,`CustomerType`,`AccountType`,`BranchId`) VALUES (?)";
  const values = [
    req.body.Name,
    req.body.CustomerId,
    req.body.DOB,
    req.body.Gender,
    req.body.AccountNo,
    req.body.CustomerType,
    req.body.AccountType,
    req.body.BranchId,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    return res.json("Customer added successfully.");
  });
});

app.post("/p3", (req, res) => {
  const q = "INSERT INTO branch (`BranchId`,`Loc`) VALUES (?)";
  const values = [req.body.BranchId, req.body.Loc];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json({ error: err.sqlMessage });
    return res.json("Branch added successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend.");
});
