const express = require("express");
const app = express();
const port = 3000;

const cookieParser = require("cookie-parser");
let userRouter = require("./routes/user.route");
let productRouter = require("./routes/product.route");

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;
