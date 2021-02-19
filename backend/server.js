const express = require("express");
const dotenv = require("dotenv");
const { productsRoutes } = require("./routes");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use("/api/products", productsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`));