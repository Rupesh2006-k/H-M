require("dotenv").config();
let connectDB = require("./src/db/db");
const app = require("./src/app");
let morgan = require('morgan')
connectDB();
const port = 3000;

app.use(morgan("dev"))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
