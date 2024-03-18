const { createLead,getAllLeads,  getSingleLead, updateLead, deleteLead } = require("../controllers/lead");
const moduleRoute = require("express").Router()

//Get single Lead

moduleRoute.route("/:id").get( getSingleLead)
moduleRoute.route("/").get(getAllLeads)


//Get user id by Leads


//Create new Lead

moduleRoute.route("/").post( createLead)

//Update Lead

moduleRoute.route("/:id").put( updateLead)

//Delete Lead

moduleRoute.route("/:id").delete( deleteLead)

module.exports = moduleRoute;