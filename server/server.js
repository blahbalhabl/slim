require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//API Route
app.use("/api", routes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
