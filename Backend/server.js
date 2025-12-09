const app = require("./src/app");
require("dotenv").config();
let connectDB = require("./src/db/db");
const port = 3000;
7;
connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
