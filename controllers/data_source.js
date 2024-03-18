const { INTERNAL_SERVER_ERROR, SERVER_ERROR, CREATED, OK, USER_TYPES, BAD_REQUEST, BAD_REQUEST_MESSAGE, NOT_FOUND, DATA_SOURCE_FOUND, DATA_SOURCE_CREATED, DATA_SOURCE_UPDATED, DATA_SOURCE_DELETED, DATA_SOURCE_DUPLICATE, DATA_SOURCE_NOT_FOUND, } = require("../constants/constants");
const { sendResponse, usePagination } = require("../helpers");
const {data_source} = require("../models")
const { validationResult } = require("express-validator");


//Get single DataSource
module.exports.getSingleDataSource = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const DataSource = await data_source.findOne({ where: { id } })

        if (!DataSource) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, DATA_SOURCE_NOT_FOUND))
        }
        return res
            .status(OK)
            .json(sendResponse({ DataSource: DataSource }, OK, DATA_SOURCE_FOUND))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Get all data_source
module.exports.getAllDataSource = async (req, res, next) => {
    try {
       
        const DataSource = await data_source.findAll()
        if (!DataSource || DataSource.length === 0) {  
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, DATA_SOURCE_DUPLICATE));
        }

        if (Object.keys(req.query).length === 0) {
            return res
                .status(OK)
                .json(sendResponse({ data_source: DataSource }, OK, "DATA_SOURCE_FOUND"));
        } else {

            const pagination = usePagination(req.query, data_source, ['title']);
            return res
                .status(OK)
                .json(sendResponse({ data_source: pagination }, OK, DATA_SOURCE_FOUND));
        }

    } catch (error) {
        console.log("::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
    }
}


//Create new DataSource
module.exports.createDataSource = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, errors))
        }

        const { title} = req.body;
        
        const DataSource = await data_source.create({ title })

        return res
            .status(CREATED)
            .json(sendResponse({ DataSource: DataSource.dataValues }, CREATED, DATA_SOURCE_CREATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Update DataSource
module.exports.updateDataSource = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const DataSource = await data_source.update(
            { ...req.body },
            { where: { id } }
        )

        if (DataSource[0] == 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, DATA_SOURCE_DUPLICATE))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, DATA_SOURCE_UPDATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Delete DataSource
module.exports.deleteDataSource = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))


      
            const DataSource = await data_source.destroy({ where: { id } })

            if (DataSource === 0) {
                return res
                    .status(NOT_FOUND)
                    .json(sendResponse(null, NOT_FOUND, DATA_SOURCE_NOT_FOUND))
            }

            return res
                .status(OK)
                .json(sendResponse(null, OK, DATA_SOURCE_DELETED))
        
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}
