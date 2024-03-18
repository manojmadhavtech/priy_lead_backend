const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.json({}));
app.use(
  express.urlencoded({
    extended: false,
    limit: 10000,
    parameterLimit: 2,
  })
);

app.use(cors());
app.options("*", cors());

// app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/v1/", express.static("uploads"));
app.use("/api/v1", require("./routes"));

const port = process.env.NODE_APP_PORT;
app.listen(port, () => {
    //console.log("process env variables:", process.env),
    console.log(`Server listening on port: http://localhost:${port}`);
});
