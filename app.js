require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// import the Routers
const createRouter = require("./routes/create");
const displayRouter = require("./routes/display.js");

const PORT = process.env.PORT || 3000;

const DB_STRING = process.env.MONGODB_URL;

// DB connection
mongoose.connect(
  DB_STRING,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("Database is connected")
);

const connection = mongoose.connection;
connection.on("error", console.log.bind(console, "mongo connection error"));

const app = express();

// request body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable cors
app.use(cors());

// use routers
app.use("/create", createRouter);
app.use("/display", displayRouter);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));
