const { INTERNAL_SERVER_ERROR,STATUS_NOT_FOUND, SERVER_ERROR, CREATED, OK, STATUS_DUPLICATE, BAD_REQUEST, BAD_REQUEST_MESSAGE, NOT_FOUND, STATUS_FOUND, STATUS_CREATED, STATUS_DELETED, STATUS_UPDATED, } = require("../constants/constants");
const { sendResponse, usePagination } = require("../helpers");
const {status} = require("../models")
const { validationResult } = require("express-validator");


//Get single status
module.exports.getSingleStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const Status = await status.findOne({ where: { id } })

        if (!Status) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, STATUS_NOT_FOUND))
        }
        return res
            .status(OK)
            .json(sendResponse({ Status: Status }, OK, STATUS_FOUND))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Get all status
module.exports.getAllStatus = async (req, res, next) => {
    try {
       
        const Status = await status.findAll()
        if (!Status || Status.length === 0) {  
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, STATUS_NOT_FOUND));
        }

        if (Object.keys(req.query).length === 0) {
            return res
                .status(OK)
                .json(sendResponse({ Status: Status }, OK, STATUS_FOUND));
        } else {

            const pagination = usePagination(req.query, status, ['status']);
            return res
                .status(OK)
                .json(sendResponse({ Status: pagination }, OK, STATUS_FOUND));
        }

    } catch (error) {
        console.log("::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
    }
}


//Create new status
module.exports.createStatus = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, errors))
        }

        const { title} = req.body;
        
        const Status = await status.create({ title })

        return res
            .status(CREATED)
            .json(sendResponse({ Status: Status.dataValues }, CREATED, STATUS_CREATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Update status
module.exports.updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const Status = await status.update(
            { ...req.body },
            { where: { id } }
        )

        if (Status[0] == 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, STATUS_DUPLICATE))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, STATUS_UPDATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Delete 
module.exports.deleteStatus = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))


      
            const Status = await status.destroy({ where: { id } })

            if (Status === 0) {
                return res
                    .status(NOT_FOUND)
                    .json(sendResponse(null, NOT_FOUND, STATUS_NOT_FOUND))
            }

            return res
                .status(OK)
                .json(sendResponse(null, OK, STATUS_DELETED))
        
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}
