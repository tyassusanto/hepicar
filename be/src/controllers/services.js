const { v4: uuid } = require('uuid');
const createError = require('http-errors');
const commonHelper = require('../common/common')

const servicesModels = require('../models/services')

const searchName = async (req, res, next) => {
    try {
        const searchName = req.query.name;
        const sort = req.query.sort || 'name';
        const order = req.query.order || 'DESC';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const resServices = await servicesModels.searchName({
            searchName,
            sort,
            order,
            offset,
            limit
        })
        const totalCount = await servicesModels.countServices()
        const [{ total }] = totalCount
        res.status(200)
        commonHelper.response(res, resServices, 200, null, {
            currentPage: page,
            limitData: limit,
            totalData: total,
            totalPage: Math.ceil(total / limit)
        })
    } catch (error) {
        console.log(error, 'error get')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const addService = async (req, res, next) => {
    try {
        const { name, description, currency, price } = req.body;
        const nameService = await servicesModels.findService(name)
        if (nameService.length > 0) {
            return next(createError(403, 'service sudah terdaftar'))
        }
        const data = {
            name,
            description,
            currency,
            price,
        };
        const result = await servicesModels.addService(data)
        res.status(200)
        commonHelper.response(res, data, 200, `${name} Berhasil ditabahkan ke daftar service`)
    } catch (error) {
        console.log(error, 'error post')
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
}

const deleteService = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await servicesModels.deleteService(id);
        commonHelper.response(res, `Id Service : ${12}`, 200, `Service berhasil dihapus`)
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
};

const updateService = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, description, price } = req.body
        const update = {
            name,
            description,
            price,
        };
        const result = await servicesModels.updateService(update, id);
        res.json({
            status: 'Success',
            code: 200,
            update,
            message: `${name} berhasil diupdate`
        });
    } catch (error) {
        res.status(500),
            next({
                status: 500,
                message: 'Internal Server Error'
            })
    }
};


module.exports = {
    searchName,
    addService,
    deleteService,
    updateService
}