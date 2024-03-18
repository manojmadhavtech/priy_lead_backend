const { createDataSource, getAllDataSource, getSingleDataSource, updateDataSource, deleteDataSource } = require("../controllers/data_source");
const moduleRoute = require("express").Router()

//Get single DataSource

moduleRoute.route("/:id").get( getSingleDataSource)

//Get user id by DataSource


//Get parent id by DataSource

moduleRoute.route("/").get( getAllDataSource)

//Create new DataSource

moduleRoute.route("/").post( createDataSource)

//Update DataSource

moduleRoute.route("/:id").put( updateDataSource)

//Delete DataSource

moduleRoute.route("/:id").delete( deleteDataSource)

module.exports = moduleRoute;