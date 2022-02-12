const connection = require("./db-config");
const express = require("express");
const app = express();
const cors = require("cors");

const { Routes } = require("./routes/index.routes");

const port = process.env.PORT;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());
app.use(cors());

Routes(app);

app.listen(port, () => console.log(`Server started on port ${port}`));
