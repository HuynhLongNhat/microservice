import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "th2",
});

function connect() {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      return;
    }
    console.log("Connected to database!");
  });
}

const dbConnect = { connect, connection };
export default dbConnect;
