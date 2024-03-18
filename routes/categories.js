const { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory, getUserIdByCategories } = require("../controllers/categories");
const moduleRoute = require("express").Router()

//Get single category

moduleRoute.route("/:id").get( getSingleCategory)

//Get user id by categories


//Get parent id by categories

moduleRoute.route("/").get( getAllCategories)

//Create new category

moduleRoute.route("/").post( createCategory)

//Update category

moduleRoute.route("/:id").put( updateCategory)

//Delete category

moduleRoute.route("/:id").delete( deleteCategory)

module.exports = moduleRoute;