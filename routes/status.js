const { createStatus, getAllStatus, getSingleStatus, updateStatus, deleteStatus } = require("../controllers/status");
const moduleRoute = require("express").Router()

//Get single category

moduleRoute.route("/:id").get( getSingleStatus)

//Get user id by categories


//Get parent id by categories

moduleRoute.route("/").get( getAllStatus)

//Create new category

moduleRoute.route("/").post( createStatus)

//Update category

moduleRoute.route("/:id").put( updateStatus)

//Delete category

moduleRoute.route("/:id").delete( deleteStatus)

module.exports = moduleRoute;