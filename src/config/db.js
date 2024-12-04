import mysql from "mysql2";

const dbConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "th2",
});

dbConnect.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database!");
});

export default dbConnect;
