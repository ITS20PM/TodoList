require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const cors = require("cors")

const app = express();
app.use(express.json());

// use cors
app.use(cors());

// routes
const todo = require("./routes/todo");

// connect to db
connectDB();

// initialize middleware
// app.use(express.json({ extended: false }));
app.get("/", (_req, res) => res.send("Server up and running"));

// user routes
app.use("/", todo);

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});