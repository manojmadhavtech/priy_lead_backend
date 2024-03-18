const { createArea, getAllArea, getSingleArea, updateArea, deleteArea } = require("../controllers/area");
const moduleRoute = require("express").Router()

//Get single Area

moduleRoute.route("/:id").get( getSingleArea)

//Get user id by Area


//Get parent id by Area

moduleRoute.route("/").get( getAllArea)

//Create new Area

moduleRoute.route("/").post( createArea)

//Update Area

moduleRoute.route("/:id").put( updateArea)

//Delete Area

moduleRoute.route("/:id").delete( deleteArea)

module.exports = moduleRoute;