const { INTERNAL_SERVER_ERROR, SERVER_ERROR, CREATED, OK, USER_TYPES, BAD_REQUEST, BAD_REQUEST_MESSAGE, NOT_FOUND, AREA_FOUND, AREA_NOT_FOUND, AREA_CREATED, AREA_UPDATED, AREA_DELETED, AREA_RECORD_NOT_EXIST, } = require("../constants/constants");
const { sendResponse, usePagination } = require("../helpers");
const {area} = require("../models")
const { validationResult } = require("express-validator");


//Get single Area
module.exports.getSingleArea = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const Area = await area.findOne({ where: { id } })

        if (!Area) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, AREA_RECORD_NOT_EXIST))
        }
        return res
            .status(OK)
            .json(sendResponse({ Area: Area }, OK, AREA_FOUND))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Get all area
module.exports.getAllArea = async (req, res, next) => {
    try {
       
        const Area = await area.findAll()
        if (!Area || Area.length === 0) {  
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, AREA_RECORD_NOT_EXIST));
        }

        if (Object.keys(req.query).length === 0) {
            return res
                .status(OK)
                .json(sendResponse({ area: Area }, OK, AREA_FOUND));
        } else {

            const pagination = usePagination(req.query, area, ['title']);
            return res
                .status(OK)
                .json(sendResponse({ area: pagination }, OK, AREA_FOUND));
        }

    } catch (error) {
        console.log("::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
    }
}


//Create new Area
module.exports.createArea = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, errors))
        }

        const { title} = req.body;
        
        const Area = await area.create({ title })

        return res
            .status(CREATED)
            .json(sendResponse({ Area: Area.dataValues }, CREATED, AREA_CREATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Update Area
module.exports.updateArea = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const Area = await area.update(
            { ...req.body },
            { where: { id } }
        )

        if (Area[0] == 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, AREA_RECORD_NOT_EXIST))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, AREA_UPDATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Delete Area
module.exports.deleteArea = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))


      
            const Area = await area.destroy({ where: { id } })

            if (Area === 0) {
                return res
                    .status(NOT_FOUND)
                    .json(sendResponse(null, NOT_FOUND, AREA_RECORD_NOT_EXIST))
            }

            return res
                .status(OK)
                .json(sendResponse(null, OK, AREA_DELETED))
        
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}
