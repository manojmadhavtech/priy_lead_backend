const { INTERNAL_SERVER_ERROR, SERVER_ERROR, CREATED, OK, USER_TYPES, BAD_REQUEST, BAD_REQUEST_MESSAGE, NOT_FOUND, CATEGORY_FOUND, CATEGORYS_FOUND, CATEGORY_CREATED, CATEGORY_UPDATED, CATEGORY_DELETED, CANNOT_DELETE_CATEGORY_USED_IN_ARTICLES, CATEGORY_RECORD_NOT_EXIST, } = require("../constants/constants");
const { sendResponse, usePagination } = require("../helpers");
const {categories} = require("../models")
const { validationResult } = require("express-validator");


//Get single category
module.exports.getSingleCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const category = await categories.findOne({ where: { id } })

        if (!category) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, CATEGORY_RECORD_NOT_EXIST))
        }
        return res
            .status(OK)
            .json(sendResponse({ category: category }, OK, CATEGORY_FOUND))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Get all categories
module.exports.getAllCategories = async (req, res, next) => {
    try {
       
        const category = await categories.findAll()
        if (!category || category.length === 0) {  
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, CATEGORY_RECORD_NOT_EXIST));
        }

        if (Object.keys(req.query).length === 0) {
            return res
                .status(OK)
                .json(sendResponse({ categories: category }, OK, "CATEGORY_FOUND"));
        } else {

            const pagination = usePagination(req.query, categories, ['title']);
            return res
                .status(OK)
                .json(sendResponse({ categories: pagination }, OK, CATEGORY_FOUND));
        }

    } catch (error) {
        console.log("::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR));
    }
}


//Create new category
module.exports.createCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, errors))
        }

        const { title} = req.body;
        
        const category = await categories.create({ title })

        return res
            .status(CREATED)
            .json(sendResponse({ category: category.dataValues }, CREATED, CATEGORY_CREATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Update category
module.exports.updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))

        const category = await categories.update(
            { ...req.body },
            { where: { id } }
        )

        if (category[0] == 0) {
            return res
                .status(NOT_FOUND)
                .json(sendResponse(null, NOT_FOUND, CATEGORY_RECORD_NOT_EXIST))
        }

        return res
            .status(OK)
            .json(sendResponse(null, OK, CATEGORY_UPDATED))

    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}

//Delete category
module.exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id)
            return res
                .status(BAD_REQUEST)
                .json(sendResponse(null, BAD_REQUEST, BAD_REQUEST_MESSAGE))


      
            const category = await categories.destroy({ where: { id } })

            if (category === 0) {
                return res
                    .status(NOT_FOUND)
                    .json(sendResponse(null, NOT_FOUND, CATEGORY_RECORD_NOT_EXIST))
            }

            return res
                .status(OK)
                .json(sendResponse(null, OK, CATEGORY_DELETED))
        
    } catch (error) {
        console.log(" ::error:: ", error);
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json(sendResponse(null, INTERNAL_SERVER_ERROR, SERVER_ERROR))
    }
}
