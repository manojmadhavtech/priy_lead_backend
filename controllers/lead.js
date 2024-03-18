const { INTERNAL_SERVER_ERROR,LEAD_CREATED,LEAD_UPDATED,LEAD_DUPLICATE, SERVER_ERROR,LEADS_FOUND,LEAD_NOT_FOUND, CREATED, OK, BAD_REQUEST, BAD_REQUEST_MESSAGE, NOT_FOUND, LEAD_DELETED } = require("../constants/constants");
const { sendResponse,usePagination } = require("../helpers");
const { validationResult } = require("express-validator");
const { Lead ,categories,status,area,data_source} = require("../models"); // Import your Lead model

// Get single lead
module.exports.getSingleLead = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const lead = await Lead.findOne({ where: { id } })

        if (!lead) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, LEAD_NOT_FOUND))
        }
        return res
            .status(OK)
            .json(sendResponse({ lead }, OK, LEADS_FOUND))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

// Create new lead
module.exports.createLead = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, errorMessages))
        }
        const existingClient = await Lead.findOne({ where: { email: req.body.email } });
        if (existingClient) {
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, LEAD_DUPLICATE));
        }
    const lead = await Lead.create(req.body);

        return res
            .status(CREATED)
            .json(sendResponse({ lead }, CREATED, LEAD_CREATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

// Update lead
module.exports.updateLead = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const [updated] = await Lead.update(
            { ...req.body },
            { where: { id } }
        );

        if (updated === 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND,LEAD_NOT_FOUND))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, LEAD_UPDATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

// Delete lead
module.exports.deleteLead = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const deleted = await Lead.destroy({ where: { id } });

        if (deleted === 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, LEAD_NOT_FOUND))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, LEAD_DELETED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}
// Get all leads

module.exports.getAllLeads = async (req, res, next) => {
    try {
        // Fetch all leads from the database
        const leads = await Lead.findAll({
            include: [
                
                {
              model:categories,
              as: 'categories'
            },
            {
                model:status,
                as: 'statuses'
              },

         {
                model:area,
                as: 'areas'
              },
              {
                model:data_source,
                as: 'data_sources'
              }
        
        
        ]
        
        
        })

        // Check if there are any leads
        if (!leads || leads.length === 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, LEAD_NOT_FOUND));
        }

        // Check if pagination is needed
        if (Object.keys(req.query).length === 0) {
            // Send the leads as a response without pagination
            return res
                .status(OK)
                .json(sendResponse({ leads }, OK, LEADS_FOUND));
        } else {
            // Apply pagination
            const pagination = usePagination(req.query, leads, ['name', 'description']);

            // Send the paginated leads as a response
            return res
                .status(OK)
                .json(sendResponse({ pagination }, OK, LEADS_FOUND));
        }
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
    }
}
