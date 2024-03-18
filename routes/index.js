const express = require("express")
const fs = require("fs");
const moduleRoute = express.Router()

// Exporting all routes generally
module.exports = fs.readdirSync(__dirname + "/").forEach(function (file) {
    if (file !== "index.js" && file.substr(-3) == ".js") {
      const routeName = file.replace(".js", "");
      moduleRoute.use("/" + routeName, require("./" + routeName));
    }
  });

module.exports = moduleRoute;