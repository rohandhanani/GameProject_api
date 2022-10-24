const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");
var bodyParser = require('body-parser');

require("dotenv").config();
require("./src/database/conn");

const port = process.env.port;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// Routers //
const userRouter = require('./src/routers/user.route');
app.use("/user",userRouter);

// Listen Port //
app.listen(port, () => {
    console.log(`Your Port Is ${port}. `);
});