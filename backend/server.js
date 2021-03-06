const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const {
    productsRoutes,
    userRoutes,
    orderRoutes,
    uploadRoutes
} = require("./routes");
const {
    connectDB,
    notFound,
    errorHandler
} = require("./settings");

const app = express();
dotenv.config();
connectDB();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html")));
} else {
    app.get("/", (req, res) => res.send("APIs ready..."));
}

app.use("uploads", express.static(path.join(__dirname, "settings", "uploads")));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`));